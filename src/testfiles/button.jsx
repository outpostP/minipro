import React, { useState } from 'react';
import Modal from './modal';

function Button() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click me</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default Button;
