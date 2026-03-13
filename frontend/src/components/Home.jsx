import { useState, useRef, useEffect } from "react";
import {
  Image,
  MessageCircle,
  ArrowLeft,
  Send,
  MoreVertical,
  Wallpaper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  // State for Background Change
  const [chatBg, setChatBg] = useState("bg-[#0B141A]");
  const scrollRef = useRef(null);

  const users = [
    {
      id: 1,
      name: "Alex",
      avatar: "https://i.pravatar.cc/100?img=11",
      isOnline: true,
      lastMsg: "Check the new UI!",
      time: "12:45 PM",
    },
    {
      id: 2,
      name: "Emma",
      avatar: "https://i.pravatar.cc/100?img=32",
      isOnline: false,
      lastMsg: "That looks clean ⚡",
      time: "11:20 AM",
    },
    {
      id: 3,
      name: "John",
      avatar: "https://i.pravatar.cc/100?img=12",
      isOnline: true,
      lastMsg: "MERN stack is awesome.",
      time: "Yesterday",
    },
  ];

  const bgOptions = [
    {
      id: "dark",
      class: "bg-[#0B141A]",
      label: "Midnight Dark",
      color: "#0B141A",
    },
    {
      id: "whatsapp",
      class:
        "bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-blend-overlay bg-[#0B141A] opacity-90",
      label: "WhatsApp Doodle",
      color: "#075E54",
    },
    { id: "blue", class: "bg-[#1e293b]", label: "Deep Blue", color: "#1e293b" },
    {
      id: "purple",
      class: "bg-[#2d1b4e]",
      label: "Royal Purple",
      color: "#2d1b4e",
    },
  ];

  const initialMessages = {
    1: [
      { from: "user", text: "Hey! How is the project going?" },
      { from: "me", text: "Almost done with the frontend!" },
    ],
    2: [
      { from: "user", text: "Can we use Tailwind?" },
      { from: "me", text: "Yes, it's already integrated." },
    ],
    3: [
      { from: "user", text: "Did you fix the mobile sidebar?" },
      { from: "me", text: "Working on it right now." },
    ],
  };

  // Auto-scroll to bottom when message arrives
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser]);

  return (
    <div className="h-[calc(100vh-62px)] flex bg-[#111b21] text-gray-200 overflow-hidden font-sans">
      {/* --- SIDEBAR --- */}
      <div
        className={`${selectedUser ? "hidden" : "flex"} md:flex flex-col w-full md:w-[350px] bg-[#111b21] border-r border-[#222d32]`}
      >
        {/* Sidebar Header */}

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 border-b border-[#222d32]">
            <h2 className="text-[#00a884] font-semibold text-lg px-2">Chats</h2>
          </div>
          {users.map((user) => (
            <motion.div
              whileTap={{ scale: 0.98 }}
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b border-[#222d32] ${
                selectedUser?.id === user.id
                  ? "bg-[#2a3942]"
                  : "hover:bg-[#202c33]"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                />
                {user.isOnline && (
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#00a884] border-2 border-[#111b21] rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-normal text-[17px] text-[#e9edef] truncate">
                    {user.name}
                  </h3>
                  <span className="text-[12px] text-[#8696a0]">
                    {user.time}
                  </span>
                </div>
                <p className="text-[14px] text-[#8696a0] truncate">
                  {user.lastMsg}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MAIN CHAT --- */}
      <div
        className={`${!selectedUser ? "hidden" : "flex"} md:flex flex-1 flex-col bg-[#0b141a]`}
      >
        {selectedUser ? (
          <div className="flex flex-col h-full relative">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 bg-[#202c33] h-[60px] z-10 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden text-[#aebac1]"
                  onClick={() => setSelectedUser(null)}
                >
                  <ArrowLeft size={24} />
                </button>
                <img
                  src={selectedUser.avatar}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <div>
                  <h2 className="text-[#e9edef] font-medium leading-tight">
                    {selectedUser.name}
                  </h2>
                  <p className="text-[12px] text-[#8696a0]">
                    {selectedUser.isOnline ? "online" : "offline"}
                  </p>
                </div>
              </div>

              {/* Theme Selector Dropdown */}
              <div className="dropdown dropdown-end">
                {/* The Trigger Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="p-2 text-[#aebac1] hover:bg-[#3b4a54] rounded-full transition-all active:scale-95"
                >
                  <Wallpaper size={20} />
                </div>

                {/* The Dropdown Menu */}
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[100] menu p-2 shadow-2xl bg-[#233138] rounded-lg w-56 mt-4 border border-[#3b4a54]"
                >
                  <li className="menu-title text-[#00a884] px-4 py-2 text-[11px] uppercase tracking-widest">
                    Wallpaper
                  </li>

                  {bgOptions.map((opt) => (
                    <li key={opt.id}>
                      <button
                        onClick={() => {
                          setChatBg(opt.class);
                          // DaisyUI trick: force close by removing focus
                          document.activeElement.blur();
                        }}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-[#182229] active:bg-[#111b21] transition-colors
            ${chatBg === opt.class ? "text-[#00a884]" : "text-[#e9edef]"}
          `}
                      >
                        {/* Color Preview */}
                        <div
                          className="w-4 h-4 rounded-full border border-[#3b4a54]"
                          style={{ backgroundColor: opt.color }}
                        />
                        <span className="text-sm">{opt.label}</span>

                        {/* Active Dot */}
                        {chatBg === opt.class && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00a884]" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Message Area with Dynamic Background */}
            <div
              className={`flex-1 overflow-y-auto p-4 md:px-10 space-y-2 transition-all duration-700 ${chatBg}`}
            >
              <AnimatePresence>
                {initialMessages[selectedUser.id]?.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative px-3 py-1.5 max-w-[85%] md:max-w-[65%] text-[14.2px] shadow-sm rounded-lg ${
                        msg.from === "me"
                          ? "bg-[#005c4b] text-[#e9edef] rounded-tr-none"
                          : "bg-[#202c33] text-[#e9edef] rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                      <div className="text-[10px] text-[#8696a0] text-right mt-1 ml-4 inline-block">
                        12:50 PM
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={scrollRef} />
              </AnimatePresence>
            </div>

            {/* Input Footer */}
            <div className="p-2 bg-[#202c33] flex items-center gap-2">
              <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-4 py-1">
                <label className="cursor-pointer text-[#aebac1] mr-3">
                  <Image size={22} />
                  <input type="file" className="hidden" />
                </label>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 bg-transparent border-none outline-none py-2 text-[#e9edef] placeholder-[#8696a0]"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-[#00a884] p-3 rounded-full text-[#111b21]"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-[#222e35] border-b-4 border-[#00a884]">
            <div className="relative">
              <MessageCircle size={100} className="text-[#3b4a54]" />
            </div>
            <h1 className="text-[32px] font-light text-[#e9edef] mt-8">
              ChatSphere Web
            </h1>
            <p className="text-[#8696a0] text-sm mt-4 text-center max-w-sm px-6">
              Send and receive messages without keeping your phone online.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
