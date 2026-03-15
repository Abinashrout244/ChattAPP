import { Lock, Mail, User, UserRound, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotGrid from "../components/ui/DotGrid";
import img from "../assets/images/chat.png";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";

export default function LoginPage() {
  const [isLogedin, setIsLogedin] = useState(true);
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("tony.mail@mail.com");
  const [password, setPassword] = useState("Tony@1234_");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/login",
        { emailId, password },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res?.data?.findUser || null));
      toast.success("Logged in successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.log(err?.response || err);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      console.log(res?.data?.newUser);
      dispatch(addUser(res?.data?.newUser));
      toast.success("User Register Sucessfully!!");
      navigate("/", { replace: true });

      navigate("/");
    } catch (err) {
      console.log(err?.response || err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative h-[calc(100vh-62px)] w-full flex items-center justify-center bg-base-200 text-base-content overflow-hidden p-4 md:p-0">
      {/* 1. THE BACKGROUND DOT GRID */}
      <div className="absolute inset-0 z-0 opacity-50">
        <DotGrid
          dotSize={6}
          gap={20}
          baseColor="#3f4147"
          activeColor="#5865F2"
          proximity={150}
          shockRadius={300}
          shockStrength={5}
          resistance={500}
          returnDuration={1.2}
        />
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex w-full max-w-6xl min-h-125 md:min-h-150 bg-base-100/80 backdrop-blur-xl rounded-3xl border border-base-300 shadow-2xl overflow-hidden">
        {/* LEFT SIDE: FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto md:mx-0">
            <h2 className="text-3xl font-bold text-base-content mb-2">
              {isLogedin ? "Welcome back" : "Get started"}
            </h2>
            <p className="text-base-content/60 mb-8 text-sm">
              {isLogedin
                ? "Enter your details to access your account."
                : "Join our community of developers today."}
            </p>

            <form className="space-y-4">
              {!isLogedin && (
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center gap-3 bg-base-200 px-4 py-3 rounded-xl border border-base-300 focus-within:border-primary transition-all">
                    <UserRound size={18} className="text-base-content/60" />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFisrtName(e.target.value)}
                      className="bg-transparent outline-none text-base-content text-sm w-full"
                    />
                  </label>
                  <label className="flex-1 flex items-center gap-3 bg-base-200 px-4 py-3 rounded-xl border border-base-300 focus-within:border-primary transition-all">
                    <User size={18} className="text-base-content/60" />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-transparent outline-none text-base-content text-sm w-full"
                    />
                  </label>
                </div>
              )}

              <label className="flex items-center gap-3 bg-base-200 px-4 py-3 rounded-xl border border-base-300 focus-within:border-primary transition-all">
                <Mail size={18} className="text-base-content/60" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="bg-transparent outline-none text-base-content text-sm w-full"
                />
              </label>

              <label className="flex items-center gap-3 bg-base-200 px-4 py-3 rounded-xl border border-base-300 focus-within:border-primary transition-all">
                <Lock size={18} className="text-base-content/60" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none text-base-content text-sm w-full"
                />
              </label>

              {isLogedin && (
                <div className="flex justify-end">
                  <span className="text-xs text-primary hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
              )}

              {isLogedin ? (
                <button
                  onClick={handleLogin}
                  className="w-full bg-primary hover:brightness-110 text-primary-content py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleSignup}
                  className="w-full bg-primary hover:brightness-110 text-primary-content py-3 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
                >
                  Create Account
                </button>
              )}
            </form>

            <p className="text-center text-base-content/60 mt-8 text-sm">
              {isLogedin ? "New here?" : "Already have an account?"}
              <button
                onClick={() => setIsLogedin(!isLogedin)}
                className="text-primary font-semibold ml-2 hover:underline"
              >
                {isLogedin ? "Create an account" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: ILLUSTRATION */}
        {/* RIGHT SIDE: IMAGE */}
        <div className="hidden md:flex w-1/2 bg-base-200/50 items-center justify-center p-12 relative">
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* NEW RELIABLE PNG LINK */}
            <img
              src={img}
              alt="Chat Illustration"
              className="w-full max-w-[350px] drop-shadow-[0_20px_50px_rgba(88,101,242,0.3)]"
            />
            <div className="mt-10">
              <h3 className="text-base-content text-3xl font-bold mb-2 tracking-tight">
                Real-time Connect
              </h3>
              <p className="text-base-content/60 text-sm max-w-[280px] mx-auto leading-relaxed">
                Connect with developers globally in a seamless and interactive
                environment.
              </p>
            </div>
          </div>

          {/* The Glow Effect */}
          <div className="absolute w-72 h-72 bg-primary rounded-full blur-[160px] opacity-20 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
