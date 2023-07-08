import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ChangeUsernameForm = () => {
  const initialValues = {
    currentUsername: '',
    newUsername: '',
  };

  const validationSchema = Yup.object({
    currentUsername: Yup.string().required('Current username is required'),
    newUsername: Yup.string().required('New username is required'),
  });

  const handleSubmit = (values) => {
    const { currentUsername, newUsername } = values;
    const url = window.location.hostname
    const data = {
      currentUsername,
      newUsername,
      FE_URL: url,
    };

    const token =  localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername', data, { headers })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.log('lmao')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
      <div className="mb-4">
  <label htmlFor="currentUsername" className="block">Current Username:</label>
  <Field
    type="text"
    id="currentUsername"
    name="currentUsername"
    className="border border-gray-300 rounded-md p-2"
  />
  <ErrorMessage name="currentUsername" component="div" className="text-red-500 mt-1" />
</div>

<div className="mb-4">
  <label htmlFor="newUsername" className="block">New Username:</label>
  <Field
    type="text"
    id="newUsername"
    name="newUsername"
    className="border border-gray-300 rounded-md p-2"
  />
  <ErrorMessage name="newUsername" component="div" className="text-red-500 mt-1" />
</div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default ChangeUsernameForm;
