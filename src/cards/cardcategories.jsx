function CardCategories({ imageUrl, title, author, fitImage = false }) {
    const imageStyle = fitImage ? "object-contain" : "w-full";

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-md shadow-md">
      <div className="flex">
        <div className="w-1/4">
          {/* Image container */}
          <img className={imageStyle} src={`https://minpro-blog.purwadhikabootcamp.com/${imageUrl}`} alt="Categories" />
        </div>
        <div className="w-3/4 p-4">
          {/* Content container */}
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-gray-600">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCategories;
