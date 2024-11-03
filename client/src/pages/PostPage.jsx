import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function PostPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [isRented, setIsRented] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    
    // Check localStorage for rented status
    const rentedStatus = localStorage.getItem(`rented_${postSlug}`);
    if (rentedStatus === 'true') {
      setIsRented(true);
    }

    fetchPost();
  }, [postSlug]);

  const handleRentBook = async () => {
    if (!currentUser) {
      alert('You must be logged in to rent a book.');
      return;
    }

    const userId = currentUser._id;

    try {
      const response = await fetch('/api/books/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          postId: post._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rent the book');
      }

      setIsRented(true);
      alert('Book rented successfully');
      
      // Store rented status in localStorage
      localStorage.setItem(`rented_${postSlug}`, 'true');
      
    } catch (error) {
      alert(error.message); // Display the error message properly
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader" /> {/* Replace with your loading spinner */}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">An error occurred while fetching the post.</div>;
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post.title}
      </h1>
      <h2 className="text-xl mt-3 text-center font-semibold">{post.author}</h2>
      <p className="text-center italic text-sm">{post.category}</p>
      <p className="text-center text-lg font-bold mt-2">${post.price}</p>
      
      {/* Image display */}
      <img
        src={post.image}
        alt={post.title}
        className="mt-5 w-full h-auto max-h-[400px] object-cover rounded-md"
      />
      
      <p className="mt-5 text-gray-700">{post.description}</p>
      {!isRented ? (
        <button
          onClick={handleRentBook}
          className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Rent Book
        </button>
      ) : (
        <p className="mt-5 text-green-600">Book is rented</p>
      )}
    </main>
  );
}


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';

// export default function PostPage() {
//   const dispatch = useDispatch()
//   const { currentUser, rentedBooks } = useSelector((state) => state.user);
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);
//   const [isRented, setIsRented] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//         const data = await res.json();
//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         setPost(data.posts[0]);
//         setLoading(false);
//       } catch {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, [postSlug]);

//   const handleRentBook = async () => {
//     if (!currentUser) {
//       alert('You must be logged in to rent a book.');
//       return;
//     }

//     const userId = currentUser._id;

//     try {
//       const response = await fetch('/api/books/rent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           postId: post._id,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to rent the book');
//       }

//       setIsRented(true);
//       alert('Book rented successfully');
//     } catch (error) {
//       alert(error.message); // Display the error message properly
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="loader" /> {/* Replace with your loading spinner */}
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">An error occurred while fetching the post.</div>;
//   }

//   return (
//     <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
//       <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
//         {post.title}
//       </h1>
//       <h2 className="text-xl mt-3 text-center font-semibold">{post.author}</h2>
//       <p className="text-center italic text-sm">{post.category}</p>
//       <p className="text-center text-lg font-bold mt-2">${post.price}</p>
      
//       {/* Image display */}
//       <img
//         src={post.image}
//         alt={post.title}
//         className="mt-5 w-full h-auto max-h-[400px] object-cover rounded-md"
//       />
      
//       <p className="mt-5 text-gray-700">{post.description}</p>
//       {!isRented ? (
//         <button
//           onClick={handleRentBook}
//           className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Rent Book
//         </button>
//       ) : (
//         <p className="mt-5 text-green-600">Book is rented</p>
//       )}
//     </main>
//   );
// }
