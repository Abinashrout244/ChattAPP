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
      className={`${selectedUser ? "hidden" : "flex"} md:flex flex-col w-full md:w-87.5 bg-base-200 border-r border-base-300`}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 border-b border-base-300">
          <h2 className="text-primary font-semibold text-lg px-2">Chats</h2>
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
                className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-base-300 ${selectedUser?._id === u._id ? "bg-base-300" : "hover:bg-base-300/60"}`}
              >
                <div className="relative">
                  <img
                    src={u.photoURL}
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />

                  {onlineUsers.includes(u._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-200 rounded-full"></span>
                  )}
                </div>

                <div className="flex justify-between items-start gap-2 w-full">
                  <h3 className="font-normal text-[16px] sm:text-[17px] text-base-content truncate max-w-[140px] sm:max-w-[180px] md:max-w-[200px]">
                    {u.firstName}
                  </h3>

                  <div className="flex flex-col items-end gap-1 min-w-[40px]">
                    <span className="text-[11px] sm:text-[12px] text-base-content/60 whitespace-nowrap">
                      {lastMsg?.createdAt
                        ? new Date(lastMsg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>

                    {unreadCounts[u._id] > 0 && (
                      <span className="bg-primary text-primary-content text-[10px] sm:text-xs px-[6px] sm:px-2 py-[1px] rounded-full min-w-[18px] text-center font-medium">
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
