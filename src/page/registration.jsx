import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };


  const urlpath = window.location.origin;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
    .min(6, 'Name at least 6 characters long')
    .required('Username is required'),
    email: Yup.string()
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Invalid email format'
      )
      .required('Email is required'),
    phoneNumber: Yup.string()
      .min(10, 'Please input valid min length')
      .max(18, 'Please input valid max length')
      .matches(/^\d+$/, 'Phone Number must contain only numbers')
      .required('Phone Number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
        'Password must contain at least 1 capital letter, 1 symbol, and 1 digit'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { username, email, phoneNumber, password, confirmPassword } = values;
    // console.log(phoneNumber)
    try {
      const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/auth/', {
        username: username,
        email: email,
        phone: phoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        FE_URL: urlpath,
      });
  
      console.log(response.data);
  
      if (response.status === 200) {
        // Registration succeeded
        setMessage('Thank you for registering. Please check your email to verify your account.');
      } else {
        // Registration failed
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      if (error.response && error.response.data) {
        // Server returned validation errors
        setErrors(error.response.data.errors);
        console.log(error)
        setMessage('Server returned validation errors');
      } else {
        // Other error occurred
        setMessage('An error occurred. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };
 

  const [message, setMessage] = useState('');

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
      >
        <Form className="w-1/3 bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Registration</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              validateOnChange
              validateOnBlur
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              validateOnChange
              validateOnBlur
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-2">
              Phone Number
            </label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              validateOnChange
              validateOnBlur
            />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              validateOnChange
              validateOnBlur
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm Password
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              validateOnChange
              validateOnBlur
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
          {message && (
            <div className="text-green-500 my-4">
              {message}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
