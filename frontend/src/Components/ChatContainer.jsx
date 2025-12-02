import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoChatHistoryPlaceHolder from './NoChatHistoryPlaceholder';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton'
const ChatContainer = () => {

  const {selectedUser, getMessagesByUserId, messages, isMessagesLoading} = useChatStore();
  const {authuser} = useAuthStore();
  
  useEffect(() => {
    if (!selectedUser || !selectedUser._id) return;
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  console.log(messages)
  return (
    <>
    <ChatHeader/>
    <div className="flex-1 px-6 overflow-y-auto py-8">
      {messages.length > 0 ? (
        <div className='max-w-3xl mx-auto space-y-6'>

          {isMessagesLoading ? <MessagesLoadingSkeleton/> : (
            messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${msg.senderId === authuser?._id ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble relative ${
                  msg.senderId === authuser?._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
                }`}
              >
                {msg.image && (
                  <img src={msg.image} alt="shared" className="rounded-lg h-48 object-cover" />
                )}
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
              </div>
            </div>
            ))
          )}
        </div>
      ) : (
        <NoChatHistoryPlaceHolder name={selectedUser?.fullName} />
      )}
    </div>
    <MessageInput/>
    </>
  )
}

export default ChatContainer
