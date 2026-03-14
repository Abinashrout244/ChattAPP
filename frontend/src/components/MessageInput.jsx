import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Send } from "lucide-react";
const MessageInput = ({
  previewUrl,
  clearImage,
  imageFile,
  handleImageUpload,
  messageInput,
  setMessageInput,
  sendMessages,
}) => {
  return (
    <div className="p-2 bg-[#202c33] relative">
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-full left-4 mb-2 p-2 bg-[#2a3942] rounded-lg shadow-xl border border-[#3b4a54] z-20"
          >
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-32 rounded-md object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-1">
          <label
            className={`cursor-pointer mr-3 transition-colors ${imageFile ? "text-[#00a884]" : "text-[#aebac1]"}`}
          >
            <Image size={22} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessages()}
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none outline-none py-2 text-[#e9edef] placeholder-[#8696a0]"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#00a884] p-3 rounded-full text-[#111b21]"
          onClick={sendMessages}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default MessageInput;
