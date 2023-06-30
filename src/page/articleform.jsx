import React, { useState, useEffect } from 'react';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [country, setCountry] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [picture, setPicture] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Failed to fetch categories', error));
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleKeywordsChange = (e) => {
    const keywordsString = e.target.value;
    const keywordsArray = keywordsString.split(',').map((keyword) => keyword.trim());
    setKeywords(keywordsArray);
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('data', JSON.stringify({
      title: title,
      content: content,
      country: country,
      CategoryId: categoryId,
      url: '',
      keywords: keywords
    }));

    formData.append('file', picture);

    try {
      const token =  localStorage.getItem("token")
       const response = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Article submitted');
        // Reset form fields
        setTitle('');
        setContent('');
        setCountry('');
        setCategoryId('');
        setUrl('');
        setKeywords([]);
        setPicture(null);
      } else {
        console.error('Failed to submit article');
      }
    } catch (error) {
      console.error('Failed to submit article', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Write an Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the article title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your article content"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={handleCountryChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the country"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={handleCategoryIdChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the URL"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords.join(', ')}
            onChange={handleKeywordsChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter keywords separated by commas"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
            Picture
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
