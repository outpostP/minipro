import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function RegistrationField () {

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
        </Form>
      </Formik>
    </div>
    )
}  