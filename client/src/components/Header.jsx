import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Sona's Library
        </Link>

        {/* User Dropdown */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="relative inline-block text-left">
              <button
                className="px-4 py-2 font-semibold text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                @{currentUser.username}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-3 px-4">
                    <p className="text-sm">@{currentUser.username}</p>
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <Link
                      to="/dashboard?tab=profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 font-semibold text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-200">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2 flex space-x-4">
          <Link to="/" className={`text-gray-600 ${path === '/' ? 'font-bold' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`text-gray-600 ${path === '/about' ? 'font-bold' : ''}`}>
            About
          </Link>
          <Link to="/return" className={`text-gray-600 ${path === '/return' ? 'font-bold' : ''}`}>
            Return
          </Link>
        </div>
      </nav>
    </header>
  );
}
