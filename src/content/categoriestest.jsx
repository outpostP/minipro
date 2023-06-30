import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const BlogList = () => {
	const [categories, setCategories] = useState([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [data, setData] = useState([]);
	const [allButtonActive, setAllButtonActive] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog"
				);
				setData(response.data.result);
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
				);
				setCategories(response.data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				if (selectedCategoryId) {
					const response = await axios.get(
						`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategoryId}`
					);
					setBlogs(response.data.result);
				} else {
					setBlogs([]);
				}
			} catch (error) {
				console.error("Error fetching blogs:", error);
			}
		};

		fetchBlogs();
	}, [selectedCategoryId]);

	const handleCategoryClick = (categoryId) => {
		setSelectedCategoryId(categoryId);
		setAllButtonActive(false);
	};

	const handleAllCat = async () => {
		try {
			const response = await axios.get(
				"https://minpro-blog.purwadhikabootcamp.com/api/blog"
			);
			setData(response.data.result);
			setSelectedCategoryId(null);
			setBlogs([]);
			setAllButtonActive(true);
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold">Blog Posts</h1>
			<div className="flex my-4">
      <button
  className={`mr-2 px-4 py-2 rounded-md ${
    allButtonActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
  }`}
  onClick={handleAllCat}
>
          all
				</button>
				{categories.map((category) => (
					
					<button
          key={category.id}
          className={`mr-2 px-4 py-2 rounded-md ${
            category.id === selectedCategoryId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
						{category.name}
					</button>
					
				))}
			</div>
			{!selectedCategoryId && (
				<div>
					{data.map((blog) => (
						<Link to={`/post/${blog.id}`}>
						<div key={blog.id} className="my-4 p-4 bg-gray-100">
							<h2 className="text-xl font-bold">{blog.title}</h2>
							<p className="mt-2">{blog.content}</p>
						</div>
						</Link>
					))}
				</div>
			)}

			{blogs.map((blog) => (
				<Link to={`/post/${blog.id}`}>
				<div key={blog.id} className="my-4 p-4 bg-gray-100">
					<h2 className="text-xl font-bold">{blog.title}</h2>
					<p className="mt-2">{blog.content}</p>
				</div>
				</Link>
			))}
		</div>
	);
};

export default BlogList;
