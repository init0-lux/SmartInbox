import mongoose from 'mongoose';

// define how a database schema is going to look like
// kind of like sql, except no relations
const userSchema = new mongoose.Schema({
  name : { 
    type: String, 
    required: [true, 'User Name Is Required'], // the array takes care of an error message
    trim: true, 
    minLength: 2, 
    maxLength: 50
  },

  email : {
    type: String,
    require: [true, "Email Address is Required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
  },

  password : {
    type: String,
    required: [true, "Password is Required"],
    minLength: 8,
  } ,
	subject: {
	  type: String,
	  required: true,
	  enum: ['cse', 'elec', 'biotech', 'arts', 'science', 'medicine', 'law']
	},
	year_of_study: {
	  type: Number,
	  required: true,
	  min: 1,
	  max: 5
	},
	calendarIntegration: {
	  google: {
		accessToken: String,
		refreshToken: String
	  }
	}

}, { timestamps: true });
// timestamps: true gives us createdAt and updatedAt fields;

const User = mongoose.model('User', userSchema); // create user with the schema

export default User;

// { name: 'John Doe', email: 'john@email.com', password: 'password' }
// we get there by using User.create({ name: 'John Doe', email: '', password: '' });
