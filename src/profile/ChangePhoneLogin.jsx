import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ChangePhoneForm = () => {
  const initialValues = {
    currentPhone: '',
    newPhone: '',
  };

  
  const validationSchema = Yup.object({
    currentPhone: Yup.string()
    .min(10, 'Please input valid min length')
    .max(18, 'Please input valid max length')
    .matches(/^\d+$/, 'Phone Number must contain only numbers')
    .required('Phone Number is required'),
    newPhone: Yup.string()
    .min(10, 'Please input valid min length')
    .max(18, 'Please input valid max length')
    .matches(/^\d+$/, 'Phone Number must contain only numbers')
    .required('Phone Number is required'),
  });
  
  const handleSubmit = (values) => {
    const url = window.location.hostname
    console.log(url)
    const { currentPhone, newPhone } = values;
    const data = {
      currentPhone,
      newPhone,
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
          <label htmlFor="currentPhone" className="block">Current Phone Number:</label>
          <Field
            type="text"
            id="currentPhone"
            name="currentPhone"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="currentPhone" component="div" className="text-red-500 mt-1" />
        </div>
        <div className="mb-4">
          <label htmlFor="newPhone" className="block">New Phone Number:</label>
          <Field
            type="text"
            id="newPhone"
            name="newPhone"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <ErrorMessage name="newPhone" component="div" className="text-red-500 mt-1" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default ChangePhoneForm;
