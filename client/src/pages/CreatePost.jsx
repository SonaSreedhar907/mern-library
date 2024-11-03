import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview image
        setFormData({ ...formData, image: reader.result }); // Store the base64 image
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all required fields are present
    if (!formData.title || !formData.author || !formData.category || !formData.description || !formData.price || !formData.image) {
        setPublishError('Please provide all required fields');
        return;
    }

    setLoading(true); // Start loading

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          required
          className='flex-1 border border-gray-300 rounded-md p-2'
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='Author'
          required
          className='flex-1 border border-gray-300 rounded-md p-2'
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className='flex-1 border border-gray-300 rounded-md p-2'
          required
        >
          <option value=''>Select a category</option>
          <option value='romance'>Romance</option>
          <option value='thriller'>Thriller</option>
          <option value='horror'>Horror</option>
        </select>
        <input
          type='text'
          placeholder='Price'
          required
          className='flex-1 border border-gray-300 rounded-md p-2'
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        <textarea
          placeholder='Description'
          required
          className='flex-1 border border-gray-300 rounded-md p-2'
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='flex-1'
          />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        {/* Uncomment this if you want to use ReactQuill for rich text editing */}
        {/* <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        /> */}
        <button 
          type='submit' 
          className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Publish'}
        </button>
        {publishError && (
          <div className='mt-5 text-red-500'>
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}
