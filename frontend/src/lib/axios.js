import axios from 'axios'
const baseURL =
  import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : '/api'

export const axiosinstance = axios.create({
  baseURL,
  withCredentials: true,
})
