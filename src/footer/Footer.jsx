import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between py-4 px-6 bg-gray-900 sticky top-[100vh] w-full">
      <Link to='/'>
      <div className="flex items-center">
        <h1 className="text-white font-semibold text-xl">Blog-Go</h1>
      </div>
      </Link>
      <div className="flex items-center">
        <div>
          <form>
            <input type="email" placeholder="Enter your email" className="mr-2 px-2 py-1 rounded" />
            <button type="submit" className="bg-gray-300 text-gray-900 px-3 py-1 rounded">Subscribe</button>
          </form>
        </div>
        <div className="ml-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white mr-2">Facebook</a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white mr-2">Twitter</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
