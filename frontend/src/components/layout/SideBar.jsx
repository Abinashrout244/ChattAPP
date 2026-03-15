import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react"; // Using lucide-react for the clean icons

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = (users || []).filter((u) =>
    u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`${selectedUser ? "hidden" : "flex"} md:flex flex-col w-full md:w-87.5 bg-base-200 border-r border-base-300 h-full`}
    >
      {/* --- Fancy Header Section --- */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Chats
          </h2>
          <div className="p-2 bg-base-300/50 rounded-full cursor-pointer hover:bg-base-300 transition-colors">
            <Search className="w-5 h-5 text-base-content/70" />
          </div>
        </div>

        {/* Fancy Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <input
            type="text"
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-base-300/40 border-none focus:ring-2 focus:ring-primary/50 rounded-2xl py-2.5 pl-10 pr-10 text-sm transition-all duration-300 placeholder:text-base-content/40"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors" />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-base-100 rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-base-content/60" />
            </button>
          )}
        </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((u) => {
            const lastMsg = getLastMessage(u._id);
            const isSelected = selectedUser?._id === u._id;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileTap={{ scale: 0.97 }}
                key={u._id}
                onClick={() => {
                  dispatch(setSelectedUser(u));
                  dispatch(clearUnread(u._id));
                  localStorage.setItem("lastChatUserId", String(u._id));
                }}
                className={`flex items-center gap-3 p-3 mb-1 cursor-pointer rounded-2xl transition-all ${
                  isSelected
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                    : "hover:bg-base-300/80 text-base-content"
                }`}
              >
                {/* Avatar Section */}
                <div className="relative">
                  <img
                    src={u.photoURL}
                    className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                    alt=""
                  />
                  {onlineUsers.includes(u._id) && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-base-200 rounded-full"></span>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3
                      className={`font-semibold truncate ${isSelected ? "text-primary-content" : "text-base-content"}`}
                    >
                      {u.firstName}
                    </h3>
                    <span className={`text-[10px] font-medium opacity-70`}>
                      {lastMsg?.createdAt
                        ? new Date(lastMsg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className={`text-xs truncate pr-4 opacity-60`}>
                      {lastMsg?.text || "No messages yet"}
                    </p>

                    {unreadCounts[u._id] > 0 && (
                      <span
                        className={`flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-primary-content text-primary"
                            : "bg-primary text-primary-content"
                        }`}
                      >
                        {unreadCounts[u._id] > 99 ? "99+" : unreadCounts[u._id]}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SideBar;
