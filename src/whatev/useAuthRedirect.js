import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = (redirectPath) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('Please log in to access this page.');
      navigate(redirectPath);
    }
  }, [token, navigate, redirectPath]);
};
