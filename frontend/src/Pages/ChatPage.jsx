import { LogOut } from 'lucide-react';
import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      <div className='text-center'>ChatApp</div>      
      <button className='auth-btn p-4' onClick={() => { logout() }}>Logout</button>
    </div>
  )
}

export default ChatPage
