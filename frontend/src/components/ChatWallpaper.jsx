import React from "react";
import { Wallpaper } from "lucide-react";

const ChatWallPaper = ({ setChatBg, chatBg }) => {
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
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="p-2 text-[#aebac1] hover:bg-[#3b4a54] rounded-full"
      >
        <Wallpaper size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2 shadow-2xl bg-[#233138] rounded-lg w-56 mt-4 border border-[#3b4a54]"
      >
        {bgOptions.map((opt) => (
          <li key={opt.id}>
            <button
              onClick={() => {
                setChatBg(opt.class);
                document.activeElement.blur();
              }}
              className={`flex items-center gap-3 px-4 py-3 ${chatBg === opt.class ? "text-[#00a884]" : "text-[#e9edef]"}`}
            >
              <div
                className="w-4 h-4 rounded-full border border-[#3b4a54]"
                style={{ backgroundColor: opt.color }}
              />
              <span className="text-sm">{opt.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatWallPaper;
