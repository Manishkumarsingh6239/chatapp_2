import { create } from 'zustand'
import { axiosinstance } from '../lib/axios'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
     authuser: null,
     isCheckingAuth: true,
     isLoggingIn: false,
     isSigningUp: false,
     isUpdatingProfile: false,

     checkAuth: async () => {
          try {
               const res = await axiosinstance.get('/auth/check')
               set({ authuser: res.data })
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
}));