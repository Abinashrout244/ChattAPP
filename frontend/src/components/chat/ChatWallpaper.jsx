import React from "react";
import { Wallpaper } from "lucide-react";

const ChatWallPaper = ({ setChatBg, chatBg }) => {
  const bgOptions = [
    {
      id: "clean",
      class: "bg-base-100",
      label: "Clean",
      color: "var(--b1)",
    },
    {
      id: "soft",
      class: "bg-base-200",
      label: "Soft",
      color: "var(--b2)",
    },
    {
      id: "contrast",
      class: "bg-base-300",
      label: "Contrast",
      color: "var(--b3)",
    },
    {
      id: "accent",
      class:
        "bg-[radial-gradient(circle_at_1px_1px,oklch(var(--p))_1px,transparent_0)] bg-[length:18px_18px] bg-base-100",
      label: "Accent Grid",
      color: "var(--p)",
    },
  ];
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="p-2 text-base-content/70 hover:bg-base-300 rounded-full"
      >
        <Wallpaper size={20} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-200 rounded-lg w-56 mt-4 border border-base-300"
      >
        {bgOptions.map((opt) => (
          <li key={opt.id}>
            <button
              onClick={() => {
                setChatBg(opt.class);
                document.activeElement.blur();
              }}
              className={`flex items-center gap-3 px-4 py-3 ${chatBg === opt.class ? "text-primary" : "text-base-content"}`}
            >
              <div
                className="w-4 h-4 rounded-full border border-base-300"
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
