import User from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
	// get all users
	try{
		// find with empty object returns all users
		const users = await User.find();

		res.status(200).json({
			success: true,
			message: "All users fetched successfully",
			data: users,
		});
	}
	catch (error) {
		next(error);
	}
}

export const getUser = async (req, res, next) => {
	// get single user
	try{
		// select '-password' selects all fields except password
		const user = await User.findById( req.params.id ).select('-password');

		if (!user){
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			success: true,
			message: `User with id ${req.params.id} fetched successfully`,
			data: user,
		});
	}
	catch (error) {
		next(error);
	}
}
