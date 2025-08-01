import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router";
import "../App.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [userMetadata, setUserMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/signin");
      } else {
        setEmail(session.user.email || "");
        setUserMetadata(session.user.user_metadata);
      }
      
      setIsLoading(false);
    };
    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    navigate("/signin");
  };

  if (isLoading) {
    return (
      <div className="home-container">
        <div className="flex items-center justify-center">
          <div className="loading-spinner w-8 h-8"></div>
          <span className="ml-3 text-neutral-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container animate-fade-in">
      <div className="home-card animate-scale-in">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="home-title">Welcome Home!</h1>
          <p className="home-subtitle">
            You've successfully signed in to your account
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-xl mb-8 border border-primary-200">
          <div className="flex items-center justify-center mb-4">
            {userMetadata?.avatar_url ? (
              <img 
                src={userMetadata.avatar_url} 
                alt="Profile" 
                className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {email.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h2 className="text-lg font-semibold text-neutral-800 mb-2">
              {userMetadata?.full_name || userMetadata?.name || "User"}
            </h2>
            <p className="text-neutral-600">
              Signed in as: <span className="user-email">{email}</span>
            </p>
            {userMetadata?.provider && (
              <p className="text-sm text-neutral-500 mt-2">
                Connected via {userMetadata.provider.charAt(0).toUpperCase() + userMetadata.provider.slice(1)}
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-neutral-700 text-center mb-4">
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="btn-secondary p-4 text-left hover:scale-105 transition-transform">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <div className="font-medium">Profile Settings</div>
                  <div className="text-sm text-neutral-500">Manage your account</div>
                </div>
              </div>
            </button>
            
            <button className="btn-secondary p-4 text-left hover:scale-105 transition-transform">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-medium">Preferences</div>
                  <div className="text-sm text-neutral-500">Customize your experience</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSigningOut ? (
            <>
              <span className="loading-spinner mr-2"></span>
              Signing Out...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </>
          )}
        </button>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-neutral-100">
          <p className="text-sm text-neutral-500">
            Thanks for using our app! 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
