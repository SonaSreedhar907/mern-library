import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user); // Moved useSelector outside useEffect
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <aside className="w-full md:w-56 bg-white shadow-lg">
      <div className="flex flex-col p-4 space-y-4">
        <Link to="/dashboard?tab=profile">
          <div
            className={`flex items-center p-3 rounded-md hover:bg-indigo-100 cursor-pointer ${
              tab === 'profile' ? 'bg-indigo-500 text-white' : 'text-gray-700'
            }`}
          >
            <HiUser className="mr-2" size={20} />
            <span>
              {currentUser?.isAdmin ? 'Admin' : 'User'} Profile
            </span>
          </div>
        </Link>
        <div
          className="flex items-center p-3 rounded-md hover:bg-red-100 text-gray-700 cursor-pointer"
          onClick={() => {
            // Add your sign-out function here
          }}
        >
          <HiArrowSmRight className="mr-2" size={20} />
          <span>Sign Out</span>
        </div>
      </div>
    </aside>
  );
}
