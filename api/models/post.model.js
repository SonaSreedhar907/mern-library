import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    rentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      default: null 
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;