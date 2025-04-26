import User from "../models/userModel.js";


export const getUserProfile = async (req, res) => {
    try {
        
        // `req.user` is set by the `protect` middleware
        const user = await User.findById(req.user._id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getUserPhoneNumner = async (req, res) => {
    try {
        
        // `req.user` is set by the `protect` middleware
        const user = await User.findById(req.user._id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.phone);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

