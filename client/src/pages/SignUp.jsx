import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all the fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex p-2 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8 rounded-lg">
        {/* Left section */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="font-bold text-4xl text-gray-800">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sona's
            </span>
            Library
          </Link>
          <p className="text-sm mt-4 text-gray-600">
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right section */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block mb-1 text-gray-700 text-sm font-semibold">
                Your username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700 text-sm font-semibold">
                Your email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-700 text-sm font-semibold">
                Your password
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:from-pink-500 hover:to-purple-500 transition duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-4 justify-center text-gray-600">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <div className="mt-5 text-red-500 text-center">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
