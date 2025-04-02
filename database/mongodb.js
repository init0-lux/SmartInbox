import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error("Please define the MongoDB URI Env Variable inside .env.<development/production>.local.");
}

// connecting to mongodb
const connectToDatabase = async () => {
  try{
    await mongoose.connect(DB_URI);
    console.log(`Connected to Database in ${NODE_ENV} mode!`); // either production or development
  }
  catch (error){
    console.error("Error connecting to the database: ", error);
    process.exit( 1 ); // 1 means failure
  }
};

export default connectToDatabase;
