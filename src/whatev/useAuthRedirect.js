import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (redirectPath) => {
    const login = useSelector((state) => state.AuthReducer.login);
    const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      alert('Please log in to access this page.');
      navigate(redirectPath);
    }
  }, [login, navigate, redirectPath]);
};
