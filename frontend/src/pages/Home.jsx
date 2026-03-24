import { useState, useRef, useEffect } from "react";
import {
  Image,
  MessageCircle,
  ArrowLeft,
  Send,
  Wallpaper,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  setSelectedUser,
  setMessages,
  addMessage,
  setOnlineUsers,
  userOnline,
  userOffline,
  increaseUnread,
  clearUnread,
} from "../redux/chatSlice";
import { createConnection } from "../socket/socket";
import SideBar from "../components/layout/SideBar";
import ChatWallPaper from "../components/chat/ChatWallpaper";
import MessageInput from "../components/chat/MessageInput";
import ChatArea from "../components/chat/ChatArea";

export default function ChatPage() {
  const [messageInput, setMessageInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [chatBg, setChatBg] = useState("bg-[#0B141A]");
  const [showUserInfo, setShowUserInfo] = useState(false);

  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const scrollRef = useRef(null);

  const { user } = useSelector((state) => state?.user);
  const users = useSelector((state) => state?.chat?.user) || [];
  const selectedUser = useSelector((state) => state?.chat?.selectedUser);
  const messages = useSelector((state) => state?.chat?.messages) || [];
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const unreadCounts = useSelector((state) => state.chat.unreadCounts);

  useEffect(() => {
    const socket = createConnection();
    socketRef.current = socket;

    socket.on("receiveMessage", (msg) => {
      dispatch(addMessage(msg));
      dispatch(increaseUnread(msg.senderId));
    });

    // ⭐ ONLINE USERS
    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("userOnline", (userId) => {
      dispatch(userOnline(userId));
    });

    socket.on("userOffline", (userId) => {
      dispatch(userOffline(userId));
    });

    socket.on("socketError", (err) => {
      console.error("Socket Error:", err.message);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
      socket.off("userOnline");
      socket.off("userOffline");
      socket.off("socketError");
    };
  }, [dispatch]);

  // 2. Join Room when conversation changes

  // 3. Image Handling
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
  };

  // 4. API Calls
  const fetch_User = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/msg/allUser", {
        withCredentials: true,
      });
      dispatch(setUsers(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(BASE_URL + "/api/msg/receive/" + userId, {
        withCredentials: true,
      });
      dispatch(setMessages(res?.data?.messages || []));
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessages = async () => {
    if (!messageInput.trim() && !imageFile) return;
    if (!selectedUser) return;

    try {
      const formData = new FormData();
      formData.append("senderId", user._id);
      formData.append("receiverId", selectedUser._id);
      formData.append("text", messageInput);
      if (imageFile) formData.append("image", imageFile);

      const res = await axios.post(
        `${BASE_URL}/api/msg/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const newMessage = res.data.data;

      // Update UI & Emit
      dispatch(addMessage(newMessage));
      socketRef.current.emit("sendMessage", {
        receiverId: selectedUser._id,
        message: newMessage,
      });

      // Reset
      setMessageInput("");
      clearImage();
    } catch (err) {
      console.error("Send Error:", err);
    }
  };

  const getLastMessage = (userId) => {
    if (!messages || !Array.isArray(messages)) return null;
    const userMessages = messages.filter(
      (msg) => msg && (msg.senderId === userId || msg.receiverId === userId),
    );
    return userMessages[userMessages.length - 1] || null;
  };

  useEffect(() => {
    if (selectedUser?._id && socketRef.current) {
      socketRef.current.emit("joinChat", {
        receiverId: selectedUser._id,
      });
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    fetch_User();
  }, []);

  // Restore last open chat after refresh
  useEffect(() => {
    if (selectedUser?._id) return;
    if (!users?.length) return;
    const savedUserId = localStorage.getItem("lastChatUserId");
    if (!savedUserId) return;
    const savedUser = users.find((u) => String(u?._id) === savedUserId);
    if (!savedUser) return;
    dispatch(setSelectedUser(savedUser));
  }, [users, selectedUser, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-62px)] flex bg-base-200 text-base-content overflow-hidden font-sans">
      {/* --- SIDEBAR --- */}
      <SideBar
        selectedUser={selectedUser}
        users={users}
        getLastMessage={getLastMessage}
        setSelectedUser={setSelectedUser}
        onlineUsers={onlineUsers}
        clearUnread={clearUnread}
        unreadCounts={unreadCounts}
      />

      {/* --- MAIN CHAT --- */}
      <div
        className={`${!selectedUser ? "hidden" : "flex"} md:flex flex-1 flex-col bg-base-100`}
      >
        {selectedUser ? (
          <div className="flex flex-col h-full relative">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-base-200 h-[60px] z-10 shadow-md">
              <div className="flex items-center gap-3">
                <button
                  className="md:hidden text-base-content/70"
                  onClick={() => {
                    dispatch(setSelectedUser(null));
                    localStorage.removeItem("lastChatUserId");
                  }}
                >
                  <ArrowLeft size={24} />
                </button>
              <img
  src={selectedUser.photoURL}
  className="w-10 h-10 rounded-full cursor-pointer"
  alt=""
  onClick={() => setShowUserInfo(true)}
/>
                <div>
                  <h2 className="text-base-content font-medium leading-tight">
                    {selectedUser.firstName}
                  </h2>
                  <p className="text-[12px] text-base-content/60">
                    {onlineUsers.includes(selectedUser._id)
                      ? "online"
                      : "offline"}
                  </p>
                </div>
              </div>

              {/* Wallpaper Menu */}
              <ChatWallPaper setChatBg={setChatBg} chatBg={chatBg} />
            </div>
  <AnimatePresence>
  {showUserInfo && selectedUser && (
   <motion.div
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ duration: 0.25 }}
  className="
    fixed md:absolute top-0 right-0 
    h-full w-full md:w-[360px] 
    bg-[#0B141A] text-white
    z-[999] shadow-2xl
    flex flex-col border-l border-white/10
  "
>
  {/* HEADER */}
  <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-[#202C33]">
    
    {/* Mobile Back Button */}
    <button
      className="md:hidden text-white/80 hover:text-white"
      onClick={() => setShowUserInfo(false)}
    >
      <ArrowLeft size={22} />
    </button>

    <h2 className="font-semibold text-lg tracking-wide">
      User Info
    </h2>

    {/* Desktop Close */}
    <button
      className="ml-auto hidden md:block text-white/80 hover:text-red-400 transition"
      onClick={() => setShowUserInfo(false)}
    >
      <X size={20} />
    </button>
  </div>

  {/* CONTENT */}
  <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
    
    {/* PROFILE IMAGE */}
    <img
      src={selectedUser.photoURL}
      className="w-28 h-28 rounded-full mb-4 border-4 border-[#202C33] shadow-lg"
      alt=""
    />

    {/* NAME */}
    <h2 className="text-xl font-semibold text-center">
      <span>{selectedUser.firstName}</span>{" "}
      <span>{selectedUser?.lastName}</span>
    </h2>

    {/* STATUS */}
    <p className="text-sm mt-1 font-medium">
      {onlineUsers.includes(selectedUser._id) ? (
        <span className="text-green-400">● Online</span>
      ) : (
        <span className="text-gray-400">● Offline</span>
      )}
    </p>

    {/* BIO */}
    <p className="mt-4 text-sm text-center text-white/70 leading-relaxed px-2">
      {selectedUser.bio || "No bio available"}
    </p>

    {/* INFO SECTION */}
    <div className="mt-6 w-full space-y-4 text-sm">
      
      <div className="flex justify-between items-center bg-[#202C33] px-4 py-3 rounded-lg">
        <span className="text-white/60">Gender</span>
        <span className="font-medium">
          {selectedUser.gender || "Not specified"}
        </span>
      </div>

      <div className="flex justify-between items-center bg-[#202C33] px-4 py-3 rounded-lg">
        <span className="text-white/60">User Gmail</span>
        <span className="truncate max-w-[160px] font-medium">
          {selectedUser?.emailId}
        </span>
      </div>

    </div>
  </div>
</motion.div>
  )}
</AnimatePresence>

            {/* Message Area */}
            <ChatArea
              messages={messages}
              user={user}
              chatBg={chatBg}
              scrollRef={scrollRef}
            />

            {/* Input Footer with Preview */}
            <MessageInput
              previewUrl={previewUrl}
              clearImage={clearImage}
              imageFile={imageFile}
              handleImageUpload={handleImageUpload}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              sendMessages={sendMessages}
            />
          </div>
        ) : (
          <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-base-200 border-b-4 border-primary">
            <MessageCircle size={100} className="text-base-content/40" />
            <h1 className="text-[32px] font-light text-base-content mt-8">
              ChatSphere Web
            </h1>
            <p className="text-base-content/60 text-sm mt-4 text-center max-w-sm px-6">
              Send and receive messages in real-time with end-to-end
              connectivity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
