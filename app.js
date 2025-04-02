import express from 'express';
import { PORT } from './config/env.js';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import aiRouter from './routes/ai.routes.js';
import eventRouter from './routes/event.routes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// to specify what routes the app must use
//
// therefore we can get to signup in auth.routes.js
// by going to /api/v1/auth.
// "/" in authRouter is /api/v1/auth, not "/" of the mainurl;
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/ai", aiRouter);

app.use(errorMiddleware);

// route and callback function
app.get( '/', ( req, res ) => {
  res.send("Hello, World!\nWelcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(`Subscription API running on port http://localhost:${PORT}`);

  // connect to database happpens after the server is up and running
  await connectToDatabase(); // basically wait for this to complete
			     // before going further in the program
});

export default app;
