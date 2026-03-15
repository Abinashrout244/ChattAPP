import { Camera } from "lucide-react";
import { useState } from "react";
import DotGrid from "../components/ui/DotGrid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";
import { addUser } from "../redux/userSlice";

export default function Profile() {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState(user?.photoURL || "");
  const [err, setErr] = useState("");

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [emaild, setEmailId] = useState(user?.emailId || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setgender] = useState(user?.gender || "");

  const compressImage = (file, opts = {}) =>
    new Promise((resolve, reject) => {
      const {
        maxWidth = 1024,
        maxHeight = 1024,
        initialQuality = 0.8,
        minQuality = 0.6,
        maxBytes = 900 * 1024,
      } = opts;

      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read image"));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Invalid image"));
        img.onload = () => {
          let { width, height } = img;
          const scale = Math.min(maxWidth / width, maxHeight / height, 1);
          width = Math.round(width * scale);
          height = Math.round(height * scale);

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          let quality = initialQuality;
          let dataUrl = canvas.toDataURL("image/jpeg", quality);
          while (dataUrl.length * 0.75 > maxBytes && quality > minQuality) {
            quality = Math.max(minQuality, quality - 0.1);
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          resolve(dataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });

  // IMAGE UPLOAD FUNCTION
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const dataUrl = await compressImage(file);
      setImage(dataUrl);

      const res = await axios.put(
        BASE_URL + "/api/auth/profile-edit",
        {
          photoURL: dataUrl,
        },
        {
          withCredentials: true,
        },
      );

      const updateUser = res?.data?.user;

      if (updateUser) {
        dispatch(addUser(updateUser));
      }

      toast.success("Profile photo updated!");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  // PROFILE UPDATE FUNCTION
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

      if (updateUser) {
        dispatch(addUser(updateUser));
      }

      toast.success("User Updated Successfully!");
    } catch (err) {
      console.log(err.response);
      setErr(err?.response?.data?.message);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-62px)] flex items-center justify-center bg-base-200 text-base-content overflow-hidden p-4">
      {/* BACKGROUND DOT GRID */}
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

      {/* PROFILE CARD */}
      <div className="relative z-10 w-full max-w-lg bg-base-100/90 backdrop-blur-xl rounded-[2rem] border border-base-300 shadow-2xl p-6 md:p-8 flex flex-col justify-between">
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/30 p-1 bg-base-200">
              <img
                src={image || user?.photoURL}
                alt="profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:brightness-110 shadow-lg transition-transform active:scale-90">
              <Camera size={14} className="text-primary-content" />

              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="text-xl text-base-content font-bold mt-3">
            {firstName}
          </h2>
          <p className="text-base-content/60 text-xs">{user?.emailId}</p>
        </div>

        <div className="border-t border-base-300/50 my-4"></div>

        {err && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-2 rounded-lg text-center mb-3">
            {err}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-3">
          {/* USERNAME */}
          <div className="group">
            <label className="text-base-content/60 text-[10px] font-semibold uppercase tracking-wider ml-1">
              Username
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter username"
              className="w-full mt-1 p-2.5 rounded-xl bg-base-200 text-base-content border border-base-300 focus:border-primary outline-none text-sm transition-all"
            />
          </div>

          {/* GENDER */}
          <div className="group">
            <label className="text-base-content/60 text-[10px] font-semibold uppercase tracking-wider ml-1">
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) => setgender(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-xl bg-base-200 text-base-content border border-base-300 focus:border-primary outline-none text-sm transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* BIO */}
          <div className="group">
            <label className="text-base-content/60 text-[10px] font-semibold uppercase tracking-wider ml-1">
              Bio
            </label>

            <textarea
              rows="2"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself..."
              className="w-full mt-1 p-2.5 rounded-xl bg-base-200 text-base-content border border-base-300 focus:border-primary outline-none text-sm transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-row gap-2 mt-6">
          <button
            onClick={handleProfile}
            className="flex-1 bg-primary hover:brightness-110 text-primary-content py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            Save
          </button>

          <button className="flex-1 bg-transparent hover:bg-base-300/50 text-base-content/60 py-3 rounded-xl font-semibold text-sm border border-base-300 transition-all">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
