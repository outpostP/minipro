const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-800">Oops! Page not found.</p>
      <p className="text-gray-600">The page you are looking for does not exist.</p>
      <p className="text-gray-600">But I got almost the right song for you</p>
      <a
        href="https://youtu.be/qU9mHegkTc4"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" 
      >
        Click here
      </a>
    </div>
  );
};

export default NotFoundPage;
