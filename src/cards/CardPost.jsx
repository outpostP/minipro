/* eslint-disable jsx-a11y/img-redundant-alt */
const CardPost = ({ imageSrc, title, author }) => {
    return (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="h-32 w-32 object-cover object-top"
      src={`https://minpro-blog.purwadhikabootcamp.com/${imageSrc}`} alt="" />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{author}.</p>
      </div>
    </div>
      );
  };
  export default CardPost;