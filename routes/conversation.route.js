import express from 'express';
import { get_Or_Create_Conversation } from '../controllers/conversation.Controller.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';
const conversationRouter = express.Router();

conversationRouter.post('/conversations' ,authMiddleware , get_Or_Create_Conversation);

export default conversationRouter;