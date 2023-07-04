/* eslint-disable no-unused-vars */
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
  const [sortOrder, setSortOrder] = useState('ASC');
  
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
          url = `https://minpro-blog.purwadhikabootcamp.com/api/blog?sort=${sortOrder}&search=${searchQuery}&page=${currentBlogPage}`;
        } else if (categoryId === -1) {
          url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?sort=${sortOrder}&search=${searchQuery}&page=${currentBlogPage}`;
        } else {
          url = `https://minpro-blog.purwadhikabootcamp.com/api/blog/?sort=${sortOrder}&id_cat=${categoryId}&search=${searchQuery}&page=${currentBlogPage}`;
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
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [categoryId, currentBlogPage, searchQuery,sortOrder]);

  useEffect(() => {
    const calculateVisiblePageButtons = () => {
      const totalPagesToShow = 5;
      const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
      let startPage = currentBlogPage - halfTotalPagesToShow;
      let endPage = currentBlogPage + halfTotalPagesToShow;
  
      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, totalPagesToShow);
      }
  
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - totalPagesToShow + 1);
      }
  
      const visibleButtons = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
      setVisiblePageButtons(visibleButtons);
    };
  
    calculateVisiblePageButtons();
  }, [currentBlogPage, totalPages]);

  const handleCategoryChange = (event) => {
    setCategoryId(parseInt(event.target.value, 10));
    setPage(1); 
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentBlogPage(newPage);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSortOrder = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <div className="flex justify-between">
      <div className="flex">
        <select
          value={categoryId}
          onChange={handleCategoryChange}
          className="block w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none mr-4"
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
          className="block w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      <div className="flex items-center">
        <label htmlFor="ascRadio" className="mr-2 font-bold">
          Sort Order:
        </label>
        <div className="flex items-center">
          <label htmlFor="ascRadio" className="mr-2">
            <input
              type="radio"
              id="ascRadio"
              value="ASC"
              checked={sortOrder === 'ASC'}
              onChange={toggleSortOrder}
              className="mr-1 text-indigo-600"
            />
            Ascending
          </label>
          <label htmlFor="descRadio" className="ml-2">
            <input
              type="radio"
              id="descRadio"
              value="DESC"
              checked={sortOrder === 'DESC'}
              onChange={toggleSortOrder}
              className="mr-1 text-indigo-600"
            />
            Descending
          </label>
        </div>
      </div>
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
