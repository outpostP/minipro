import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const ResetPasswordComponent = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Send PUT request to the API
      await axios.put('https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass', {
        email: values.email,
      });

      // Reset the form after successful submission
      resetForm();
      alert('Password reset request has been sent successfully.');
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {isSubmitting ? 'Submitting...' : 'Reset Password'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordComponent;
