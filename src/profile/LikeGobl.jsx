import { useEffect, useState } from 'react';

const LikedPost = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const token =  localStorage.getItem("token")   
        const response = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/pagLike', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      console.log(response)
      const data = await response.json();
      console.log(data)
      setArticles(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-2xl font-bold mb-4">Blog Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="mb-2">
            {article.title}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default LikedPost;
