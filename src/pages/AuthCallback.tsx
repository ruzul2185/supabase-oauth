import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../services/supabaseClient";

export default function AuthCallback() {
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let mounted = true;

    const checkSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (session && mounted) {
          navigate("/");
          return;
        }

        // If no session, check again after a short delay
        timer = setTimeout(() => {
          checkSession();
        }, 250);
      } catch (err: any) {
        console.error("Auth callback error:", err);
        if (mounted) {
          setAuthError(
            err?.message || "An error occurred during authentication"
          );
        }
      }
    };

    // Initial check
    checkSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" && mounted) {
        navigate("/");
      }
    });

    // Cleanup function
    return () => {
      mounted = false;
      clearTimeout(timer);
      subscription?.unsubscribe();
    };
  }, [navigate]);

  if (authError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Authentication Error
          </h2>
          <p className="text-gray-600 mt-2">{authError}</p>
          <button
            onClick={() => (window.location.href = "/signin")}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
          >
            Return to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Completing Sign In...
        </h2>
        <p className="text-gray-600 mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
}
