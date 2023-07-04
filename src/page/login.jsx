import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducerwat';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginSuccess } from '../redux/reducerwat';


const LoginPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      loginIdentifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      loginIdentifier: Yup.string().required('Required'),
      password: Yup.string()
        .required('Required')
        .min(6, 'Password must be at least 6 characters long')
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*\W)/,
          'Password must contain at least 1 capital letter, 1 number, and 1 symbol'
        ),
    }),
    onSubmit: async (values) => {
      const payload = {
        username: values.loginIdentifier,
        email: '',
        phone: '',
        password: values.password,
      };

      if (values.loginIdentifier.includes('@')) {
        payload.email = values.loginIdentifier;
      } else if (/^\d+$/.test(values.loginIdentifier)) {
        payload.phone = values.loginIdentifier;
      } else {
        payload.username = values.loginIdentifier;
      }
      try{
        const res = await axios.post(`https://minpro-blog.purwadhikabootcamp.com/api/auth/login`,
        payload);
        console.log(res)
        // console.log(res.data.isAccountExist);
        // console.log(res.data.token)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.isAccountExist)
        dispatch(loginSuccess())
        dispatch(setUser(res.data.isAccountExist))
        
        setTimeout(() => {
          window.location.href = '/'
        },0)
      } catch (err){
         console.log(err);
      } 
    },
    validateOnChange: true, 
    validateOnBlur: true, 
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="loginIdentifier" className="block mb-2 text-sm font-medium">
                  Email, Phone Number, or Username
                </label>
                <input
                  type="text"
                  id="loginIdentifier"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Enter your email, phone number, or username"
                  {...formik.getFieldProps('loginIdentifier')}
                />
                {formik.touched.loginIdentifier && formik.errors.loginIdentifier && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.loginIdentifier}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} // Use state to toggle input type
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    placeholder="Enter your password"
                    {...formik.getFieldProps('password')}
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>
              <Link to="/forget">
                <div className="mb-4">
                  <div className="text-sm text-blue-500 hover:text-blue-700">
                    Forgot your password?
                  </div>
                </div>
              </Link>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
