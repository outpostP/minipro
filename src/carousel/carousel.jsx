/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import CarouselCard from '../cards/carouselcards';
import Carousel, {  autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios'
import { Link } from 'react-router-dom';


function CarouselReal() {
  const [cardData, setCardData] = useState(null); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/?sort=DESC&page=1&size=10'
        );
        setCardData(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cardData === null ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          plugins={[
            'centered',
            'arrows',
          ]}
          
        >
          {cardData.map(item => (
            <Link to={`/post/${item.id}`}>
            <CarouselCard key={item.id} imageUrl={item.imageURL} title={item.title} />
            </Link>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default CarouselReal;

