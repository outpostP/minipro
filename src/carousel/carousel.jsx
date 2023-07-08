/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import CarouselCard from '../cards/carouselcards';
import Slider from "react-slick";
import axios from 'axios'
import { Link } from 'react-router-dom';


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: true,
    centerPadding: '0px'
  };

  return (
    <>
      {cardData === null ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-col justify-center">
        <
        Slider {...settings}
        >
          {cardData.map(item => (
            <Link to={`/post/${item.id}`}>
            <CarouselCard key={item.id} imageUrl={item.imageURL} title={item.title} />
            </Link>
          ))}
          </Slider>
          </div>
          )}
    </>
  );
}

export default CarouselReal;

