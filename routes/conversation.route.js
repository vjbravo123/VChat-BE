import express from 'express';
import { get_Or_Create_Conversation } from '../controllers/conversation.Controller.js';
const conversationRouter = express.Router();

conversationRouter.post('/conversations' , get_Or_Create_Conversation);

export default conversationRouter;