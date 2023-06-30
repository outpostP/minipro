import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogComponent = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentBlogPage, setCurrentBlogPage] = useState(1);
  const [visiblePageButtons, setVisiblePageButtons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = 'https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory';
        const response = await fetch(url);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '';

        if (categoryId === 0) {
          url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/?page=${page}`;
        } else if (categoryId === -1) {
          url =
            `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?page=${page}&orderBy=total_fav&sort=DESC&size=10`;
        } else {
          url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/?id_cat=${categoryId}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        let filteredPosts = data.result;
        if (searchQuery !== '') {
          filteredPosts = filteredPosts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setBlogPosts(filteredPosts);
        setTotalPages(data.page);
        setCurrentBlogPage(data.blogPage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryId, page, searchQuery]);

  useEffect(() => {
    const calculateVisiblePageButtons = () => {
      const totalPagesToShow = 5;
      const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
      let startPage = currentBlogPage - halfTotalPagesToShow;
      let endPage = currentBlogPage + halfTotalPagesToShow;

      if (startPage < 1) {
        endPage += Math.abs(startPage) + 1;
        startPage = 1;
      }

      if (endPage > totalPages) {
        startPage -= endPage - totalPages;
        endPage = totalPages;
      }

      const visibleButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      setVisiblePageButtons(visibleButtons);
    };

    calculateVisiblePageButtons();
  }, [currentBlogPage, totalPages]);

  const handleCategoryChange = (event) => {
    setCategoryId(parseInt(event.target.value, 10));
    setPage(1); // Reset page to 1 when category changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
        <div className='flex'>
      <select
        value={categoryId}
        onChange={handleCategoryChange}
        className="block w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none mx-7"
      >
        <option value={0}>All Categories</option>
        <option value={-1}>Popular Posts</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by title"
        className="block w-64 mt-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
      />
      </div>

      <div className="mt-8">
        {blogPosts.map((post) => (
          <Link to={post.id.toString()}>
          <div key={post.id} className="mb-4 border border-black">
            <div className="flex justify-between">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.User.username}</p>
            </div>
            <p className="text-gray-600">{post.content}</p>
          </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => handlePageChange(currentBlogPage - 1)}
          disabled={currentBlogPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Previous Page
        </button>
        <div>
          <span className="mr-2">Page:</span>
          {visiblePageButtons.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded-md ${
                pageNumber === currentBlogPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={() => handlePageChange(currentBlogPage + 1)}
          disabled={currentBlogPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default BlogComponent;
