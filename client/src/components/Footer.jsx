import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <footer className='border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto p-6'>
        <div className='flex flex-col sm:flex-row justify-between'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Sona's
              </span>
              Library
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <h3 className='text-lg font-semibold'>About</h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <a
                    href=''
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-600 hover:underline'
                  >
                    Books
                  </a>
                </li>
                <li>
                  <Link
                    to='/about'
                    className='text-gray-600 hover:underline'
                  >
                    Sona's Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold'>Follow us</h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <a
                    href=''
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-600 hover:underline'
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='text-gray-600 hover:underline'
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold'>Legal</h3>
              <ul className='mt-2 space-y-1'>
                <li>
                  <a href='#' className='text-gray-600 hover:underline'>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='text-gray-600 hover:underline'>
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className='border-t border-gray-200 my-6' />
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-gray-600'>
            &copy; {new Date().getFullYear()} S
          </p>
          <div className='flex gap-6 mt-4 sm:mt-0'>
            <a href='#' className='text-gray-600 hover:text-teal-500'>
              <BsFacebook size={24} />
            </a>
            <a href='#' className='text-gray-600 hover:text-teal-500'>
              <BsInstagram size={24} />
            </a>
            <a href='#' className='text-gray-600 hover:text-teal-500'>
              <BsTwitter size={24} />
            </a>
            <a
              href=''
              className='text-gray-600 hover:text-teal-500'
              target='_blank'
              rel='noopener noreferrer'
            >
              <BsGithub size={24} />
            </a>
            <a href='#' className='text-gray-600 hover:text-teal-500'>
              <BsDribbble size={24} />
            </a>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
