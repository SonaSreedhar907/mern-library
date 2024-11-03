// controllers/bookController.js
import User from '../models/user.model.js';
import Post from '../models/post.model.js';


// Rent a book
export const rentBook = async (req, res) => {
  const { userId, postId } = req.body;
 
  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Check rental limit
    if (user.rentedBooks.length >= 3) {
      return res.status(400).send('You can only rent up to 3 books');
    }

    // Find the book
    const book = await Post.findById(postId);
    if (!book) return res.status(404).send('Book not found');

    // Update user's rented books
    user.rentedBooks.push(book._id);
    await user.save();

    // Update book's rented status
    book.rentedBy = user._id;
    await book.save();

    res.status(200).send('Book rented successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Return a book
export const returnBook = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Remove book from user's rented books
    user.rentedBooks = user.rentedBooks.filter(bookId => bookId.toString() !== postId);
    await user.save();

    // Find the book and update rented status
    const book = await Post.findById(postId);
    if (book) {
      book.rentedBy = null; // Clear the rentedBy field
      await book.save();
    }

    res.status(200).send('Book returned successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
