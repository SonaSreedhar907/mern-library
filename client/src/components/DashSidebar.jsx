import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
    <div className="w-full md:w-56 h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-1">
        {currentUser && currentUser.isAdmin && (
          <Link to="/dashboard?tab=dash">
            <div
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-md ${
                tab === 'dash' || !tab ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
            >
              <HiChartPie size={20} />
              <span>Dashboard</span>
            </div>
          </Link>
        )}
        <Link to="/dashboard?tab=profile">
          <div
            className={`p-3 flex items-center gap-2 cursor-pointer rounded-md ${
              tab === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-700'
            }`}
          >
            <HiUser size={20} />
            <span>Profile</span>
            <span className="ml-auto text-xs font-medium">
              {currentUser.isAdmin ? 'Admin' : 'User'}
            </span>
          </div>
        </Link>
        {currentUser.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <div
              className={`p-3 flex items-center gap-2 cursor-pointer rounded-md ${
                tab === 'posts' ? 'bg-blue-500 text-white' : 'text-gray-700'
              }`}
            >
              <HiDocumentText size={20} />
              <span>Posts</span>
            </div>
          </Link>
        )}
        {currentUser.isAdmin && (
          <>
            <Link to="/dashboard?tab=users">
              <div
                className={`p-3 flex items-center gap-2 cursor-pointer rounded-md ${
                  tab === 'users' ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
              >
                <HiOutlineUserGroup size={20} />
                <span>Users</span>
              </div>
            </Link>
            
          </>
        )}
        <div
          className="p-3 flex items-center gap-2 cursor-pointer rounded-md text-gray-700 hover:bg-red-500 hover:text-white"
          onClick={handleSignout}
        >
          <HiArrowSmRight size={20} />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}
