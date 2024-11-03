import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset loading and error on component mount
    dispatch(signInFailure(null));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    
    dispatch(signInStart());
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || 'Sign in failed.'));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Sona's
            </span>
            Library
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <label className='block text-sm font-medium text-gray-700' htmlFor='email'>Your email</label>
              <input
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500'
                required
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700' htmlFor='password'>Your password</label>
              <input
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500'
                required
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className={`mt-4 px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'}`}
            >
              {loading ? (
                <span className='flex items-center'>
                  Loading...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <div className='mt-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
