/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({ title, handleHate }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-black">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded" onClick={handleHate}>
        Hate
      </button>
    </div>
  );
};

const PostLiked = () => {
  const [data, setData] = useState([]);
  const TOKEN = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
          };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(
          'https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike',
          { headers }
        );

        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  

  const handleHate = async (id) => {
   console.log(TOKEN)
    axios
      .delete('https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/2', 
      {BlogId: id},
      {
        headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {data.map((item) => (
        <Card key={item.id} title={item.Blog.title} handleHate={() => handleHate(item.id)} />
      ))}
    </div>
  );
};

export default PostLiked;
