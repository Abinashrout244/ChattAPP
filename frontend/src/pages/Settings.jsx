import { useEffect, useState } from "react";
import DotGrid from "../components/ui/DotGrid"; // Ensure the path is correct
import toast from "react-hot-toast";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "dracula",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

export default function Settings() {
  const [savedTheme, setSavedTheme] = useState("black");
  const [previewTheme, setPreviewTheme] = useState("black");

  useEffect(() => {
    const storedTheme = localStorage.getItem("chat-theme") || "black";
    setSavedTheme(storedTheme);
    setPreviewTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const previewChange = (theme) => {
    setPreviewTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const saveTheme = () => {
    setSavedTheme(previewTheme);
    localStorage.setItem("chat-theme", previewTheme);
    toast.success("Theme Changed Sucessfully");
  };

  const cancelChange = () => {
    setPreviewTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  };

  return (
    <div className="relative min-h-[calc(100vh-62px)] w-full flex items-center justify-center bg-base-200 text-base-content overflow-hidden p-4 md:p-8">
      {/* 1. BACKGROUND DOT GRID */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <DotGrid
          dotSize={6}
          gap={30}
          baseColor="#3f4147"
          activeColor="#5865F2"
          proximity={140}
          shockRadius={300}
          shockStrength={5}
          resistance={500}
          returnDuration={1.2}
        />
      </div>

      {/* 2. SETTINGS CARD */}
      <div className="relative z-10 w-full max-w-6xl bg-base-100/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/5">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Appearance Settings
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Theme selector */}
          <div>
            <h2 className="text-lg font-semibold mb-4 opacity-80 text-base-content">
              Choose Theme
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => previewChange(t)}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-2 hover:bg-base-200 transition-all active:scale-95 ${
                    previewTheme === t
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-base-300"
                  }`}
                >
                  <div
                    data-theme={t}
                    className="w-full rounded-md overflow-hidden shadow-sm"
                  >
                    <div className="flex h-10">
                      <div className="bg-primary w-1/3"></div>
                      <div className="bg-secondary w-1/3"></div>
                      <div className="bg-accent w-1/3"></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold capitalize">{t}</span>
                </button>
              ))}
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={saveTheme}
                className="btn btn-primary flex-1 shadow-lg shadow-primary/20"
              >
                Save Selection
              </button>
              <button
                onClick={cancelChange}
                className="btn btn-ghost flex-1 border-base-300"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Chat Preview */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4 opacity-80 text-base-content">
              Live Preview
            </h2>

            <div className="border border-base-300 rounded-2xl bg-base-200 p-5 w-full flex-1 shadow-inner">
              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-base-300 pb-3 mb-4">
                <div className="avatar online">
                  <div className="w-10 rounded-full">
                    <img src="https://i.pravatar.cc/100?img=12" alt="avatar" />
                  </div>
                </div>

                <div>
                  <p className="font-bold text-sm">Alex Rivera</p>
                  <p className="text-[10px] uppercase font-bold text-primary">
                    Active Now
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                <div className="chat chat-start">
                  <div className="chat-bubble shadow-sm text-sm">
                    Hey! Check out this new theme.
                  </div>
                </div>

                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-primary shadow-md text-sm">
                    Looks great! It updates in real-time.
                  </div>
                </div>

                <div className="chat chat-start">
                  <div className="chat-bubble shadow-sm text-sm">
                    Which one is your favorite?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
