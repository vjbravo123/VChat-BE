import express from 'express';
import { addFriend, deleteFriend, getFriendsListByUserId, searchUsers } from '../controllers/friends.Controller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';
const friendRouter = express.Router();

friendRouter.get('/friends/' ,authMiddleware , getFriendsListByUserId);


friendRouter.delete('/friend-remove', authMiddleware , deleteFriend);


friendRouter.get('/search' ,authMiddleware , searchUsers );


friendRouter.post('/friend-add',authMiddleware , addFriend);


export default friendRouter;