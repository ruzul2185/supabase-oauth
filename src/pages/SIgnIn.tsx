import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/");
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {errorMsg && (
          <p className="text-sm text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignIn}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition mb-6"
        >
          Sign In with Email
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="text-gray-500 text-sm px-2">OR</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        <button
          onClick={() => handleOAuthSignIn("google")}
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition mb-4"
        >
          Sign In with Google
        </button>

        <button
          onClick={() => handleOAuthSignIn("github")}
          className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 transition"
        >
          Sign In with GitHub
        </button>
      </div>
    </div>
  );
}
