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
    <div className="p-2 bg-base-200 relative">
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-full left-4 mb-2 p-2 bg-base-300 rounded-lg shadow-xl border border-base-300 z-20"
          >
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-32 rounded-md object-contain"
              />
              <button
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-error text-error-content rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-base-300 rounded-lg flex items-center px-4 py-1">
          <label
            className={`cursor-pointer mr-3 transition-colors ${imageFile ? "text-primary" : "text-base-content/70"}`}
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
            className="flex-1 bg-transparent border-none outline-none py-2 text-base-content placeholder:text-base-content/60"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary p-3 rounded-full text-primary-content"
          onClick={sendMessages}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default MessageInput;
