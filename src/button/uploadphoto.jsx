import { useState } from 'react';
import axios from 'axios';

const ImageUploadButton = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setSelectedImage(file);
    console.log(selectedImage)
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      console.log(formData)
      const token = localStorage.getItem('token');
      

      try {
        const response = await axios.post('https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
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
