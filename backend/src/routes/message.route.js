import express from 'express'
const router = express.Router()
import { getAllContacts,getChatPartners, getMessagesByUserId, sendMessage } from '../controller/message.controller.js'
import { protectRoute} from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

// router.use(arcjetProtection);
router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);




export default router