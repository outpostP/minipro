/* eslint-disable no-lone-blocks */
import {FiBook, FiEdit, FiLogOut, FiUser} from 'react-icons/fi'
import { LogoIcon } from '../icons/logo';
import LoginButton from '../button/loginbutton';
import SignupButton from '../button/signupbutton';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/reducerwat';


const Navbar = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.AuthReducer.login);

  const renderButtons = () => {
    if (login) {
      return (
        <>
        <div className='flex'>
          <Link to="write">
            <button className="text-gray-300 hover:text-white flex items-center space-x-1">
              <FiEdit size={20} />
              <span className="text-sm">Write</span>
            </button>
          </Link>
          <Link to='/'>
          <button className="text-gray-300 hover:text-white flex items-center space-x-1" onClick={() => dispatch(logoutSuccess())}>
            <FiLogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
          </Link>
          <Link to="profile">
            <button className="text-gray-300 hover:text-white flex items-center space-x-1">
              <FiUser size={20} />
              <span className="text-sm">Profile</span>
            </button>
          </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
            <div className="flex-none space-around space-x-1">
      <Link to="login"> 
        <button className="text-gray-300 hover:text-white">
          <LoginButton size={20} />
        </button>
      </Link>
      <Link to="register">
        <button className="text-gray-300 hover:text-white">
          <SignupButton size={20} />
        </button>
      </Link>
    </div>
        </>
      );
    }
  };

  return (
    <nav className="w-auto flex items-center justify-between py-4 px-6 bg-gray-900">
      <Link to="/">
        <div className="flex items-center">
          <LogoIcon size={24} className="text-white mr-4" />
          <h1 className="text-white font-semibold text-xl">Blog-Go</h1>
        </div>
      </Link>
      <Link to="post">
        <div className="flex items-center bg-white rounded-md px-2 py-1">
          <FiBook className="mr-2" size={18} />
          <h2 className="text-base font-medium text-gray-900">All Posts</h2>
        </div>
      </Link>
      <div className="flex-none space-around space-x-1">{renderButtons()}</div>
    </nav>
  );
};

export default Navbar;

