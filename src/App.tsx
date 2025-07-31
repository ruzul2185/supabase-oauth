// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./auth/authProvider";
import ProtectedRoute from "./auth/protectedRoute";
import SignIn from "./pages/SIgnIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
