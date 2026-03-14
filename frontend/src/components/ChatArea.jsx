import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ChatArea = ({ messages, chatBg, user, scrollRef }) => {
  return (
    <div
      className={`flex-1 overflow-y-auto p-4 md:px-10 space-y-2 transition-all duration-700 ${chatBg}`}
    >
      <AnimatePresence>
        {messages.map((msg, idx) => (
          <motion.div
            key={msg._id || idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.senderId === user._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative px-3 py-1.5 max-w-[85%] md:max-w-[65%] text-[14.2px] shadow-sm rounded-lg ${msg.senderId === user._id ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none" : "bg-[#202c33] text-[#e9edef] rounded-tl-none"}`}
            >
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="sent"
                  className="mt-2 max-w-full rounded-lg"
                />
              )}
              <div className="text-[10px] text-[#8696a0] text-right mt-1 ml-4 inline-block">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </AnimatePresence>
    </div>
  );
};

export default ChatArea;
