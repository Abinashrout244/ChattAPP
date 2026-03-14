import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: [],
    messages: [],
    selectedUser: null,
    onlineUsers: [], // ⭐ new state
    unreadCounts: {},
  },
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      const message = action.payload;

      if (!message) return;

      const exists = state.messages.find((msg) => msg?._id === message?._id);

      if (!exists) {
        state.messages.push(message);
      }
    },

    // ⭐ set initial online users
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // ⭐ when someone comes online
    userOnline: (state, action) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },

    // ⭐ when someone goes offline
    userOffline: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (id) => id !== action.payload,
      );
    },
    increaseUnread: (state, action) => {
      const senderId = action.payload;

      if (state.selectedUser?._id === senderId) return;

      if (!state.unreadCounts[senderId]) {
        state.unreadCounts[senderId] = 0;
      }

      state.unreadCounts[senderId] += 1;
    },

    clearUnread: (state, action) => {
      const userId = action.payload;
      state.unreadCounts[userId] = 0;
    },
  },
});

export const {
  setMessages,
  setUsers,
  setSelectedUser,
  addMessage,
  setOnlineUsers,
  userOnline,
  userOffline,
  increaseUnread,
  clearUnread,
} = chatSlice.actions;

export default chatSlice.reducer;
