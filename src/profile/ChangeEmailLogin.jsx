import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ChangeEmailForm = () => {
  const initialValues = {
    currentEmail: '',
    newEmail: '',
  };

  const validationSchema = Yup.object({
    currentEmail: Yup.string().email('Invalid email format').required('Current email is required'),
    newEmail: Yup.string().email('Invalid email format').required('New email is required'),
  });

  const handleSubmit = (values) => {
    const { currentEmail, newEmail } = values;
    const url = window.location.hostname
    // Prepare the data to be sent
    const data = {
      currentEmail,
      newEmail,
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
      .patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail', data, { headers })
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          // Email changed successfully
          // You can show a success message or redirect the user to a different page
        } else {
          // Error occurred while changing the email
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
          <label htmlFor="currentEmail" className="block">Current Email:</label>
          <Field
            type="email"
            id="currentEmail"
            name="currentEmail"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="currentEmail" component="div" className="text-red-500 mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="newEmail" className="block">New Email:</label>
          <Field
            type="email"
            id="newEmail"
            name="newEmail"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="newEmail" component="div" className="text-red-500 mt-1" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default ChangeEmailForm;
