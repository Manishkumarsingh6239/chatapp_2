import React from 'react'
import { useAuthStore } from '../store/auth.store'
const ChatPage = () => {
  const { authuser, isLoggedIn, login } = useAuthStore();
  console.log("Auth User:", authuser);
  console.log("Is Logged In:", isLoggedIn);
  return (
    <div className="z-10">
      Chatpage
      <button className="btn btn-primary" onClick={login}>Login</button>
      <div>
        <h2>User Info</h2>
        <p>Name: {authuser.name}</p>
        <p>ID: {authuser._id}</p>
        <p>Age: {authuser.age}</p>
        <p>Status: {isLoggedIn ? "Logged In" : "Logged Out"}</p>
      </div>
    </div>
  )
}

export default ChatPage
