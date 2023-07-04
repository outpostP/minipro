
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const PasswordResetForm = () => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol'
      ),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm new password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { newPassword, confirmNewPassword } = values;
      const token =  localStorage.getItem("token")                    
  
      const requestBody = {
        password: newPassword,
        confirmPassword: confirmNewPassword,
      };
  
      const response = await axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/resetPass', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  

      if (response.status === 200) {
        resetForm();
        alert('Password reset successful!');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Password reset failed:', error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block mb-2 font-medium">
            Old Password
          </label>
          <Field
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="w-full p-2 border rounded"
          />
          <ErrorMessage
            name="oldPassword"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2 font-medium">
            New Password
          </label>
          <Field
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full p-2 border rounded"
          />
          <ErrorMessage
            name="newPassword"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block mb-2 font-medium">
            Confirm New Password
          </label>
          <Field
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            className="w-full p-2 border rounded"
          />
          <ErrorMessage
            name="confirmNewPassword"
            component="div"
            className="text-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 mt-4 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Reset Password
        </button>
      </Form>
    </Formik>
  );
};

export default PasswordResetForm;
