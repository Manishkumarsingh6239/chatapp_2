import axios from 'axios'

export const axiosinstance = axios.create({
  baseURL:import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})