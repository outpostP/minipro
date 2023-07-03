import { useState } from 'react';

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
      const verificationToken = resi.substring(resi.indexOf('/verification/') + '/verification/'.length);
      localStorage.setItem('verificationToken', verificationToken);

    try {
      const response = await fetch('https://minpro-blog.purwadhikabootcamp.com/api/auth/verify', {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${verificationToken}`
        }
      });

      if (response.ok) {
        setVerificationSent(true);
        setTimeout(() => {
          setVerificationSent(false);
          window.location.href = '/'; 
        }, 4000);
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={componentStyle}
    >
      <div>
        {verificationSent ? (
          <p>Verification sent, you'll be directed to the homepage.</p>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            onClick={ReturnToSender}
            disabled={verificationSent} // Disable the button after verification is sent
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
