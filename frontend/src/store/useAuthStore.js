import { create } from 'zustand'
import { axiosinstance } from '../lib/axios'
import { toast } from 'react-hot-toast'
import {io} from 'socket.io-client'
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";
export const useAuthStore = create((set,get) => ({
     authuser: null,
     isCheckingAuth: true,
     isLoggingIn: false,
     isSigningUp: false,
     isUpdatingProfile: false,
     onlineUsers: [],

     checkAuth: async () => {
          try {
               const res = await axiosinstance.get('/auth/check')
               set({ authuser: res.data })
               get().connectSocket()
          } catch (error) {
               console.log("Error in AuthCheck: ", error);
               set({ authuser: null })
          } finally {
               set({ isCheckingAuth: false })
          }
     },

     signup: async (data) => {
          set({ isSigningUp: true })
          try {
               const res = await axiosinstance.post("/auth/signup", data);
               set({ authuser: res.data });
               toast.success('Account created successfully')
               get().connectSocket()

          } catch (error) {
               toast.error(error?.response?.data?.message || 'Signup failed')
          } finally {
               set({ isSigningUp: false })
          }
     },

     login: async (data) => {
          set({ isLoggingIn: true });
          try {
               const res = await axiosinstance.post("/auth/login", data);
               set({ authuser: res.data });

               toast.success("Logged in successfully");

               get().connectSocket()

          } catch (error) {
               toast.error(error.response.data.message);
          } finally {
               set({ isLoggingIn: false });
          }
     },

     logout: async () => {
          try {
               await axiosinstance.post("/auth/logout");
               set({ authuser: null });
               toast.success("Logged out successfully");
               get().disconnectSocket()

          } catch (error) {
               toast.error("Logout failed");
          }
     },

     updateProfile: async (data) => {
          set({ isUpdatingProfile: true });
          try {
               const res = await axiosinstance.put("/auth/update-profile", data);
               set({ authuser: res.data });
               toast.success("Profile updated successfully");
          } catch (error) {
               console.log("Error in update profile:", error);
               toast.error(error.response.data.message);
          } finally {
               set({ isUpdatingProfile: false });
          }
     },

     connectSocket : ()=>{
          const {authuser} = get();
          if(!authuser || get().socket?.connected) return;
          const socket = io(BASE_URL, {
               withCredentials: true,
          });

          socket.connect();

          set({socket});

          socket.on('getOnlineUsers', (users)=>{
               set({onlineUsers: users});
               console.log("Online users: ", users);
          });
     },

     disconnectSocket:()=>{
          if(get().socket?.connected) get().socket.disconnect();
     }
}));