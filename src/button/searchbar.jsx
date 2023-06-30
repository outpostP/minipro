/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../store/actions';

const SearchBar = ({ searchQuery, updateSearchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [searchQuery, articles]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const filterArticles = () => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const handleInputChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {filteredArticles.map((article, index) => (
          <li key={index}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchQuery: state,
  };
};

const mapDispatchToProps = {
  updateSearchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
