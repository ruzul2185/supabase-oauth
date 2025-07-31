// pages/Home.tsx
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router";
// No CSS import needed for Tailwind

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin"); // fallback check (already guarded by ProtectedRoute)
      } else {
        setEmail(session.user.email || "");
      }
    };
    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-5 box-border">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center max-w-lg w-full">
        <h1 className="text-4xl text-gray-800 mb-5 font-bold">
          Welcome to Home Page
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          You're logged in as:{" "}
          <strong className="text-blue-600 font-extrabold">{email}</strong>
        </p>
        <button
          onClick={handleSignOut}
          className="bg-red-600 text-white py-3 px-6 rounded-md text-lg cursor-pointer hover:bg-red-700 transition-colors duration-300 shadow-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
