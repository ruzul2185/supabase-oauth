import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate, Link } from "react-router";
import "../App.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setErrorMsg("Please fill in all fields");
      return false;
    }
    
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Check your email for a confirmation link!");
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-card animate-scale-in">
        <div className="text-center mb-8">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Join us today and get started in minutes
          </p>
        </div>

        {errorMsg && (
          <div className="error-message animate-slide-up">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="success-message animate-slide-up">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password (min. 6 characters)"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="input-field"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link 
              to="/signin" 
              className="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-neutral-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary-600 hover:text-primary-500 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-600 hover:text-primary-500 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
