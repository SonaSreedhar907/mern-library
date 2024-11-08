import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full object-cover transition-all duration-300'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>Book name : {post.title}</p>
        <span className='italic text-sm'>Book Category : {post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='block mt-3 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md'
        >
          Click me
        </Link>
      </div>
    </div>
  );
}
