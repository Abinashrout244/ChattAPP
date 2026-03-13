import { Camera, MessageSquare } from "lucide-react";
import { useState } from "react";
import DotGrid from "./DotGrid";

export default function Profile() {
  const [image, setImage] = useState("https://i.pravatar.cc/200");
  const [formData, setFormData] = useState({
    username: "Abinash",
    email: "abhiabinash104@gmail.com",
    bio: "Full Stack Developer | React & Node.js enthusiast",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    // Changed min-h to h-screen and removed calc to ensure a tight fit
    <div className="relative w-full  h-[calc(100vh-62px)] flex items-center justify-center bg-[#1E1F22] overflow-hidden p-4">
      {/* 1. BACKGROUND DOT GRID */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotGrid
          dotSize={6}
          gap={25}
          baseColor="#3f4147"
          activeColor="#5865F2"
          proximity={130}
          shockRadius={280}
          shockStrength={5}
          resistance={500}
          returnDuration={1.2}
        />
      </div>

      {/* 2. PROFILE CARD */}
      <div className="relative z-10 w-full max-w-lg bg-[#2B2D31]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl p-6 md:p-8 flex flex-col justify-between">
        {/* Profile Avatar Section - Tightened margins */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative group">
            {/* Reduced avatar size from w-32 to w-24 for better vertical fit */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#5865F2]/30 p-1 bg-[#1E1F22]">
              <img
                src={image}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-[#5865F2] p-2 rounded-full cursor-pointer hover:bg-[#4752C4] shadow-lg transition-transform active:scale-90">
              <Camera size={14} className="text-white" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="text-xl text-white font-bold mt-3">
            {formData.username}
          </h2>
          <p className="text-[#8696a0] text-xs">{formData.email}</p>
        </div>

        <div className="border-t border-white/5 my-4"></div>

        {/* Form Fields - Compact spacing */}
        <div className="space-y-3">
          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Enter username"
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all"
            />
          </div>

          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Email address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email"
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all"
            />
          </div>

          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Bio
            </label>
            <textarea
              rows="2" // Reduced rows from 3 to 2
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Tell something about yourself..."
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons - Reduced top margin */}
        <div className="flex flex-row gap-2 mt-6">
          <button className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-[#5865f2]/20">
            Save
          </button>

          <button className="flex-1 bg-transparent hover:bg-white/5 text-gray-400 py-3 rounded-xl font-semibold text-sm border border-[#3f4147] transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
