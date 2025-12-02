import React,{useEffect} from 'react'
import { useChatStore } from '../store/useChatStore';
import NoChatsFound from './NoChatsFound';
import UsersLoadingSkeleton from './UserLoadingSkeleton';

const ChatsList = () => {

  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore();


  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return <UsersLoadingSkeleton />;
  }
  if (allContacts.length === 0) {
    return <NoChatsFound />;
  }
  return (
    <div className='flex flex-col gap-2'>
       {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-6">
            {/* <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}> */}
            <div className="avatar online">
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatsList
