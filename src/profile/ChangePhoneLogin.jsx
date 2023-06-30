import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ChangePhoneForm = () => {
  const initialValues = {
    currentPhoneNumber: '',
    newPhoneNumber: '',
  };

  const url = window.location.hostname

  const validationSchema = Yup.object({
    currentPhoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Invalid phone number')
      .required('Current phone number is required'),
    newPhoneNumber: Yup.string()
      .matches(/^\d{10}$/, 'Invalid phone number')
      .required('New phone number is required'),
  });

  const handleSubmit = (values) => {
    const { currentPhoneNumber, newPhoneNumber } = values;

    // Prepare the data to be sent
    const data = {
      currentPhoneNumber,
      newPhoneNumber,
      FE_URL: url,
    };

    // Get the token from wherever you have stored it
    const token =  localStorage.getItem("token");

    // Set the Authorization header with the Bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
      
    };

    // Send a PATCH request using Axios with the headers
    axios
      .patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone', data, { headers })
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          // Phone number changed successfully
          // You can show a success message or redirect the user to a different page
        } else {
          // Error occurred while changing the phone number
          // You can handle the error and show an appropriate message to the user
        }
      })
      .catch((error) => {
        // Handle any network or server errors
        console.error('Error:', error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="currentPhoneNumber" className="block">Current Phone Number:</label>
          <Field
            type="text"
            id="currentPhoneNumber"
            name="currentPhoneNumber"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="currentPhoneNumber" component="div" className="text-red-500 mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="newPhoneNumber" className="block">New Phone Number:</label>
          <Field
            type="text"
            id="newPhoneNumber"
            name="newPhoneNumber"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="newPhoneNumber" component="div" className="text-red-500 mt-1" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default ChangePhoneForm;
