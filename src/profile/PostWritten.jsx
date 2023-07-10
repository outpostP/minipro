/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

const Card = ({ id, title }) => {
  const handleRemove = async () => {
    try {
      await axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`);
      console.log(`Post with ID ${id} has been removed.`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-black">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

function PostWritten() {
  const [data, setData] = useState([]);
  const TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/blog/auth",
          { headers }
        );

        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {data.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
}

export default PostWritten;
