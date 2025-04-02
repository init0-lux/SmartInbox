import { Router } from 'express';
const userRouter = Router();

import authorize from '../middlewares/auth.middleware.js';
//import { getAllUsers, createUser, getUserById, updateUserById, deleteUser } from '../controllers/user.controller.js';
import { getAllUsers, getUser } from '../controllers/user.controller.js';


// GET /users => get all users
// GET /users/:id => dynamic parameters which gets user no. :id


// you can have different routes with same end-point,
// as long as they have different verbs
userRouter.get( '/', authorize, getAllUsers);

userRouter.post( '/', (req, res) => {
  res.send({ title: "CREATE New User"});
});

userRouter.get( '/:id', authorize, getUser);

// put is typically used for updates
userRouter.put( '/:id', (req, res) => {
  res.send({ title: "UPDATE User by Id"});
});

userRouter.delete( '/:id', (req, res) => {
  res.send({ title: "DELETE User by Id"});
});

export default userRouter;
