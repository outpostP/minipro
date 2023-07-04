import { useSelector } from "react-redux";
import axios from "axios";

const Article = ({ title, image, author, content, category, id }) => {
  const login = useSelector((state) => state.AuthReducer.login);
  const token = localStorage.getItem("token");

  const handleLike = () => {
    axios
      .post(
        'https://minpro-blog.purwadhikabootcamp.com/api/blog/like',
        { BlogId: id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        console.log(response.data);
   
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleHate = () => {
    axios
      .delete('https://minpro-blog.purwadhikabootcamp.com/api/blog/unlike/2', 
      { BlogId: id },
      {       
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold p-4 flex justify-between">
        {title}<span>{category}</span>
      </h1>
      <div>
        <img src={`https://minpro-blog.purwadhikabootcamp.com/${image}`} alt="Article" className="w-full" />
      </div>
      <div className="p-4">
        <p className="text-gray-600">Author: {author}</p>
      </div>
      <div className="p-4">
        <p>{content}</p>
      </div>
      {login && (
        <div>
          <button
            onClick={handleLike}
            className="p-4 mt-4 text-white bg-blue-400 hover:bg-blue-700 rounded-md"
          >
            Eh
          </button>
          <button
            onClick={handleHate}
            className="p-4 mt-4 text-white bg-red-500 hover:bg-red-700 rounded-md"
          >
            Hate
          </button>
        </div>
      )}
    </div>
  );
};

export default Article;
