import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/reducerwat';

const ChangeEmailForm = () => {
  const dispatch = useDispatch()
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
    const data = {
      currentEmail,
      newEmail,
      FE_URL: url,
    };

    const token =  localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
          };
    axios
      .patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail', data, { headers })
      .then((response) => {
        console.log(response)
           if (response.status === 200) {
          } else {
            console.log(response.status)
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" >Submit</button>
      </Form>
    </Formik>
  );
};

export default ChangeEmailForm;
// onClick={() => dispatch(logoutSuccess())}