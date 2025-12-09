import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ENV } from '../lib/env.js';

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // console.log("Socket: ",socket)
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            console.log('Socket connection Rejected: No token found in cookies');
            return next(new Error('Authentication error: Token not found'));
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);

        if (!decoded || !decoded.userId) {
            console.log('Socket connection Rejected: Invalid token');
            return next(new Error('Authentication error: Invalid token'));
        }
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            console.log('Socket connection Rejected: User not found');
            return next(new Error('Authentication error: User not found'));
        }

        socket.user = user;
        socket.userId = user._id.toString();
        console.log('Socket connection Accepted for user: ', user.fullName, " with user ID: ", user._id.toString());
        next();

    } catch (error) {
        console.log('Socket connection Rejected:', error.message);
        next(new Error('Authentication error'));
    }
}