import { Camera, MessageSquare } from "lucide-react";
import { useState } from "react";
import DotGrid from "./DotGrid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
export default function Profile() {
  const [image, setImage] = useState("https://i.pravatar.cc/200");
  const { user } = useSelector((state) => state?.user);
  const [err, setErr] = useState("");
  const [firstName, setFirstName] = useState(user?.firstName || "");

  const [emaild, setEmailId] = useState(user?.emailId || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setgender] = useState(user?.gender || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const dispatch = useDispatch();

  const handleProfile = async () => {
    setErr("");
    try {
      const res = await axios.put(
        BASE_URL + "/api/auth/profile-edit",
        {
          firstName,
          about,
          gender,
        },
        {
          withCredentials: true,
        },
      );
      const updateUser = res?.data?.user;
      console.log(res?.data?.user);

      if (updateUser) {
        dispatch(addUser(updateUser));
      }
      alert("user update Sucessfully");
      toast.success("User Update Sucessfully!");
    } catch (err) {
      console.log(err.response);
      setErr(err?.response?.data?.message);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-62px)] flex items-center justify-center bg-[#1E1F22] overflow-hidden p-4">
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
        <div className="flex flex-col items-center mb-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#5865F2]/30 p-1 bg-[#1E1F22]">
              <img
                src={user?.photoURL}
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

          <h2 className="text-xl text-white font-bold mt-3">{firstName}</h2>
          <p className="text-[#8696a0] text-xs">{user?.emailId}</p>
        </div>

        <div className="border-t border-white/5 my-4"></div>
        {err && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-2 rounded-lg text-center mb-3">
            {err}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-3">
          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Username
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter username"
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all"
            />
          </div>

          {/* <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Email address
            </label>
            <input
              type="email"
              value={emaild}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email"
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all"
            />
          </div> */}

          {/* GENDER DROP DOWN SECTION */}
          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="group">
            <label className="text-[#8696a0] text-[10px] font-semibold uppercase tracking-wider ml-1">
              Bio
            </label>
            <textarea
              rows="2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself..."
              className="w-full mt-1 p-2.5 rounded-xl bg-[#1E1F22] text-white border border-[#3f4147] focus:border-[#5865F2] outline-none text-sm transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 mt-6">
          <button
            onClick={handleProfile}
            className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-[#5865f2]/20"
          >
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
