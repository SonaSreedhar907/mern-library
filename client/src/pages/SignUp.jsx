import { Link } from 'react-router-dom';

export default function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block mb-1 text-gray-700 text-sm font-semibold">
                Your username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-semibold hover:from-pink-500 hover:to-purple-500 transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-4 justify-center text-gray-600">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
