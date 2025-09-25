import express from 'express';
import { addFriend, deleteFriend, getFriendsListByUserId, searchUsers } from '../controllers/friends.Controller.js';
const friendRouter = express.Router();

friendRouter.get('/friends/:userId' , getFriendsListByUserId);


friendRouter.delete('/friend-remove' , deleteFriend);


friendRouter.get('/search' , searchUsers );


friendRouter.post('/friend-add' , addFriend);


export default friendRouter;