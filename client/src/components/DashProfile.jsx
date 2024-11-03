import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
          className='border rounded p-2'
        />
        <input
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          className='border rounded p-2'
        />
        <input
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
          className='border rounded p-2'
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded p-2'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded p-2 w-full'>
              Create a post
            </button>
          </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <div className='text-green-500 mt-5'>
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className='text-red-500 mt-5'>
          {updateUserError}
        </div>
      )}
      {error && (
        <div className='text-red-500 mt-5'>
          {error}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-between'>
              <button
                className='bg-red-500 text-white rounded p-2'
                onClick={handleDeleteUser}
              >
                Confirm
              </button>
              <button
                className='bg-gray-300 rounded p-2'
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
