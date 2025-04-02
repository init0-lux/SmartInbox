import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
	try{
		let token;

		if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
			token = req.headers.authorization.split(" ")[1]; // return the second part of the split
		}

		if(!token){
			const error = new Error("Unauthorized Access");
			error.statusCode = 401;
			throw error;
		}

		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.userId);

		if(!user) {
			const error = new Error("Unauthorized Access");
			error.statusCode = 401;
			throw error;
		}

		// now we know which user is making the request
		req.user = user;
		next();
	}
	catch(error) {
		res.status(401).json({
			success: false,
			message: "Unauthorized Access",
			error: error.message,
		});
	}
};

export default authorize;
