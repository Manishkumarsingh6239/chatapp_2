import {create} from 'zustand'
import {axiosinstance} from '../lib/axios'
import { toast } from 'react-hot-toast'

export const useAuthStore = create((set) => ({
     authuser: null,
    isCheckingAuth: true,
    isSigningUp:false,
    chechAuth: async ()=>{
        try {
           const res = await axiosinstance.get('/auth/check')
            set({authuser: res.data})
       } catch (error) {
            console.log("Error in AuthCheck: ",error);
            set({authuser:null})
       } finally{
            set({isCheckingAuth:false})
       }
    },
    signup: async(data)=>{
     set({isSigningUp: true})
     try {
          const res = await axiosinstance.post("/auth/signup", data);
          set({authuser: res.data});
          toast.success('Account created successfully')
     } catch (error) {
          toast.error(error?.response?.data?.message || 'Signup failed')
     }finally{
          set({isSigningUp:false})
     }
    }
}));