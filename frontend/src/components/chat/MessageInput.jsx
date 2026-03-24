import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image, Send, Smile } from "lucide-react"; // Added Smile
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({
  previewUrl,
  clearImage,
  imageFile,
  handleImageUpload,
  messageInput,
  setMessageInput,
  sendMessages,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  // Function to insert emoji at the cursor position
  const onEmojiClick = (emojiData) => {
    const input = inputRef.current;
    const start = messageInput.substring(0, input.selectionStart);
    const end = messageInput.substring(input.selectionStart);
    const newText = start + emojiData.emoji + end;
    
    setMessageInput(newText);
    
    // Maintain focus on input
    setTimeout(() => {
      input.focus();
      const newCursorPos = start.length + emojiData.emoji.length;
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  return (
    <div className="p-2 bg-base-200 relative">
      <AnimatePresence>
        {/* Image Preview - existing code */}
        {previewUrl && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="absolute bottom-full left-4 mb-2 p-2 bg-base-300 rounded-lg shadow-xl border border-base-300 z-20"
          >
            <div className="relative">
              <img src={previewUrl} alt="Preview" className="max-h-32 rounded-md object-contain" />
              <button onClick={clearImage} className="absolute -top-2 -right-2 bg-error text-error-content rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Emoji Picker Section */}
        {showEmojiPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-full left-0 mb-2 z-50"
          >
            <EmojiPicker 
               onEmojiClick={onEmojiClick} 
               theme="auto" // Matches system/browser theme
               width={300}
               height={400}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-base-300 rounded-lg flex items-center px-4 py-1">
          {/* Emoji Toggle Button */}
          <button
            type="button"
            className={`mr-2 transition-colors ${showEmojiPicker ? "text-primary" : "text-base-content/70"}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={22} />
          </button>

          <label className={`cursor-pointer mr-3 transition-colors ${imageFile ? "text-primary" : "text-base-content/70"}`}>
            <Image size={22} />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>

          <input
            ref={inputRef} // Added ref here
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onFocus={() => setShowEmojiPicker(false)} // Hide picker when user starts typing
            onKeyDown={(e) => e.key === "Enter" && sendMessages()}
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none outline-none py-2 text-base-content placeholder:text-base-content/60"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary p-3 rounded-full text-primary-content"
          onClick={() => {
            sendMessages();
            setShowEmojiPicker(false);
          }}
        >
          <Send size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default MessageInput;