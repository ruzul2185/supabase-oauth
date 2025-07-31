// pages/Home.tsx
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router";

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
    <div>
      <h1>Welcome to Home Page</h1>
      <p>
        You're logged in as: <strong>{email}</strong>
      </p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
