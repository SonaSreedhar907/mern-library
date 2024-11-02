import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if any field is missing
    if (!username || !email || !password) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(400, 'Email is already in use'));
        }

        // Hash the password only if it's defined
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json({ message: 'Signup successful' });
        
    } catch (error) {
        next(error);
    }
};
