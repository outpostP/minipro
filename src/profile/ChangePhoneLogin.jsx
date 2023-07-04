import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ChangePhoneForm = () => {
  const initialValues = {
    currentPhoneNumber: '',
    newPhoneNumber: '',
  };

  
  const validationSchema = Yup.object({
    currentPhoneNumber: Yup.string()
    .min(10, 'Please input valid min length')
    .max(18, 'Please input valid max length')
    .matches(/^\d+$/, 'Phone Number must contain only numbers')
    .required('Phone Number is required'),
    newPhoneNumber: Yup.string()
    .min(10, 'Please input valid min length')
    .max(18, 'Please input valid max length')
    .matches(/^\d+$/, 'Phone Number must contain only numbers')
    .required('Phone Number is required'),
  });

  const handleSubmit = (values) => {
    const { currentPhoneNumber, newPhoneNumber } = values;

    const url = window.location.hostname
    const data = {
      currentPhoneNumber,
      newPhoneNumber,
      FE_URL: url,
    };
    
    const token =  localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      
    };

    axios
      .patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone', data, { headers })
      .then((response) => {
        console.log(response)
        console.log(data)
        if (response.status === 200) {
         console.log('success 200')
        } else {
          console.log(response)
        console.log(data)
          console.log('lol')
        }
      })
      .catch((error) => {
   
        console.log(data)
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
