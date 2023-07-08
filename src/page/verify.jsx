import { useState } from 'react';
import axios from 'axios';

const VerifyButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const componentStyle = {
    background: isHovered ? 'red' : 'transparent',
  };

  const ReturnToSender = async () => {
    const resi = window.location.pathname;
    const token = resi.substring(resi.indexOf('/verification/') + '/verification/'.length);
    localStorage.setItem('verificationToken', token);


    try {
      const response = await axios.patch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)

      if (response.status === 200) {
        setVerificationSent(true);
        setTimeout(() => {
          setVerificationSent(false);
          window.location.href = '/';
        }, 2000);
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={componentStyle}>
      <div>
        {verificationSent ? (
          <p>Verification sent, you'll be directed to the homepage.</p>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={ReturnToSender}
            disabled={verificationSent} 
          >
            VERIFY
          </button>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default VerifyButton;
