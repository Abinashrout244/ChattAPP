import React from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const SideBar = ({
  selectedUser,
  users,
  getLastMessage,
  setSelectedUser,
  onlineUsers,
  clearUnread,
  unreadCounts,
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${selectedUser ? "hidden" : "flex"} md:flex flex-col w-full md:w-87.5 bg-[#111b21] border-r border-[#222d32]`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 border-b border-[#222d32]">
          <h2 className="text-[#00a884] font-semibold text-lg px-2">Chats</h2>
        </div>
        {Array.isArray(users) &&
          users.map((u) => {
            const lastMsg = getLastMessage(u._id);
            return (
              <motion.div
                whileTap={{ scale: 0.98 }}
                key={u._id}
                onClick={() => {
                  dispatch(setSelectedUser(u));
                  dispatch(clearUnread(u._id));
                  localStorage.setItem("lastChatUserId", String(u._id));
                }}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-[#222d32] ${selectedUser?._id === u._id ? "bg-[#2a3942]" : "hover:bg-[#202c33]"}`}
              >
                <div className="relative">
                  <img
                    src={u.photoURL}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />

                  {onlineUsers.includes(u._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111b21] rounded-full"></span>
                  )}
                </div>

                <div className="flex justify-between items-start gap-2 w-full">
                  <h3 className="font-normal text-[16px] sm:text-[17px] text-[#e9edef] truncate max-w-[140px] sm:max-w-[180px] md:max-w-[200px]">
                    {u.firstName}
                  </h3>

                  <div className="flex flex-col items-end gap-1 min-w-[40px]">
                    <span className="text-[11px] sm:text-[12px] text-[#8696a0] whitespace-nowrap">
                      {lastMsg?.createdAt
                        ? new Date(lastMsg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>

                    {unreadCounts[u._id] > 0 && (
                      <span className="bg-[#00a884] text-white text-[10px] sm:text-xs px-[6px] sm:px-2 py-[1px] rounded-full min-w-[18px] text-center font-medium">
                        {unreadCounts[u._id] > 99 ? "99+" : unreadCounts[u._id]}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default SideBar;
