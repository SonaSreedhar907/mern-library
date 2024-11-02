import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Sona's Library
        </Link>
        <div className="hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-1 mr-2"
          />
          <button className="text-gray-600">
            <AiOutlineSearch />
          </button>
        </div>
        <div className="flex items-center">
          <button className="hidden sm:inline text-gray-600 mr-2">
            <FaMoon />
          </button>
          <Link to="/sign-in">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <nav className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex space-x-4">
          <Link to="/" className={`text-gray-600 ${path === '/' ? 'font-bold' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-gray-600 ${path === '/about' ? 'font-bold' : ''}`}>
            About
          </Link>
          <Link to="/projects" className={`text-gray-600 ${path === '/projects' ? 'font-bold' : ''}`}>
            Projects
          </Link>
        </div>
      </nav>
    </header>
  );
}
