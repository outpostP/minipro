import React, { useState } from 'react';

const ImageUploadButton = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log('Response:', data);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error:', error);
        });
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex items-center">
      <label htmlFor="fileInput" className="mr-4">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <span className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer">
          Select Image
        </span>
      </label>
      {selectedImage && (
        <div className="flex">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
            onClick={handleUpload}
          >
            Upload
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;
