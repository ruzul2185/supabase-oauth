import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // This will be called after the OAuth flow completes
    // We'll just redirect to the home page after a short delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800">Completing Sign In...</h2>
        <p className="text-gray-600 mt-2">You'll be redirected shortly</p>
      </div>
    </div>
  );
}
