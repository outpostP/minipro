import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage,  } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuthRedirect } from "../whatev/useAuthRedirect";

const CreateArticle = () => {
	useAuthRedirect('/');
	const [categories, setCategories] = useState([]);

	
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get(
					"https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory"
				);
				setCategories(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCategories();
	}, []);

	const initialValues = {
		title: "",
		content: "",
		country: "",
		CategoryId: "",
		keywords: [],
		file: null,
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("Title is required"),
		content: Yup.string().required("Content is required"),
		country: Yup.string().required("Country is required"),
		CategoryId: Yup.string().required("Category ID is required"),
		keywords: Yup.string().required("At least one keyword is required"),
		file: Yup.mixed()
			.required("File is required")
			.test("fileType", "Only image files are allowed", (value) => {
				if (!value) return false;
				return (
					value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
				);
			}),
	});

	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData();

		const data = {
			title: values.title,
			content: values.content,
			country: values.country,
			CategoryId: values.CategoryId,
			keywords: values.keywords
		};

		formData.append("data", JSON.stringify(data));
		formData.append("file", values.file);

		try {
			const token = localStorage.getItem("token");

			const headers = {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			};

			const response = await axios.post(
				"https://minpro-blog.purwadhikabootcamp.com/api/blog",
				formData,
				{ headers }
			);

			
			resetForm();
		} catch (error) {
			
			console.error("Error posting blog data", error);
		}
	};

	return (
		<div className="mx-auto flex justify-center items-center min-h-screen">
	

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values, setFieldValue }) => (
					<Form
						className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
						encType="multipart/form-data"
					>
						<h1 className="text-2xl font-bold mb-6 text-center">
							Create Your Blog
						</h1>
						<div className="mb-4">
							<label
								htmlFor="title"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Title
							</label>
							<Field
								type="text"
								name="title"
								id="title"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							/>
							<ErrorMessage
								name="title"
								component="p"
								className="text-red-500 text-xs italic"
							/>
						</div>

						<div className="mb-4">
							<label
								htmlFor="content"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Content
							</label>
							<Field
								as="textarea"
								name="content"
								id="content"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								rows="4"
							/>
							<ErrorMessage
								name="content"
								component="p"
								className="text-red-500 text-xs italic"
							/>
						</div>

						<div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter the country"
              />
              <ErrorMessage name="country" component="div" className="text-red-500" />
            </div>

						<div className="mb-4">
							<label
								htmlFor="country"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Kategori
							</label>
							<Field
								as="select"
								name="CategoryId"
								id="CategoryId"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							>
								<option value="" disabled>
									Select Category
								</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="CategoryId"
								component="p"
								className="text-red-500 text-xs italic"
							/>
						</div>

						<div className="mb-4">
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                Keywords
              </label>
              <Field
                type="text"
                id="keywords"
                name="keywords"
                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter keywords separated by commas"
              />
              <ErrorMessage name="keywords" component="div" className="text-red-500" />
            </div>

						<div className="mb-4">
							<label
								htmlFor="file"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Image
							</label>
							<input
								className="mt-5 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
								type="file"
								id="file"
								name="file"
								accept="image/jpeg, image/png, image/gif"
								onChange={(event) => {
									setFieldValue("file", event.currentTarget.files[0]);
								}}
							/>
							<ErrorMessage
								name="file"
								component="p"
								className="text-red-500 text-xs italic"
							/>
						</div>

						<hr />

						<div className="flex items-center justify-start mt-5">
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-600 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
							>
								Create Blog
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateArticle;