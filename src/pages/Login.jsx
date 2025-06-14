import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/NewAuthContext";
import { Title } from "../components/Title";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);

  const { login, isLoading, isAuthenticated, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from query parameters
  const returnTo = new URLSearchParams(location.search).get("returnTo") || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(returnTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, returnTo]);

  // Handle rate limiting
  useEffect(() => {
    if (loginAttempts >= 5) {
      setIsBlocked(true);
      setBlockTimer(300); // 5 minutes in seconds
    }
  }, [loginAttempts]);

  // Block timer countdown
  useEffect(() => {
    let interval;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer((prev) => prev - 1);
      }, 1000);
    } else if (blockTimer === 0) {
      setIsBlocked(false);
      setLoginAttempts(0);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer]);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        form: undefined,
      }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      googleLogin();
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});

      await login(formData.email, formData.password);
      // Reset attempts on successful login
      setLoginAttempts(0);

      // Redirect handled by useEffect
    } catch (err) {
      setLoginAttempts((prev) => prev + 1);

      let errorMessage = "Failed to log in. Please check your credentials.";

      if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      } else if (err.message === "User not found") {
        errorMessage = "No account found with this email.";
      } else if (err.message === "Invalid password") {
        errorMessage = "Incorrect password.";
      } else if (err.message.includes("Too many")) {
        errorMessage = "Too many login attempts. Please try again later.";
      }

      setErrors({ form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-300" />
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Title text1="SIGN" text2=" IN" />
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {errors.form && (
            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
              <p className="text-red-700 text-sm">{errors.form}</p>
            </div>
          )}

          {isBlocked && (
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
              <p className="text-blue-700 text-sm">
                Too many login attempts. Please try again in{" "}
                {Math.floor(blockTimer / 60)}:
                {String(blockTimer % 60).padStart(2, "0")} minutes.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                disabled={isSubmitting || isBlocked}
                className={`appearance-none relative block w-full px-3.5 py-2 border rounded-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                disabled={isSubmitting || isBlocked}
                className={`appearance-none relative block w-full px-3.5 py-2 border rounded-md focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isBlocked}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-orange-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center mt-4">
            <Link
              to="/signup"
              className="text-sm text-gray-400 hover:text-orange-400"
              tabIndex={isSubmitting || isBlocked ? -1 : 0}
            >
              Create a new account?{" "}
              <span className="font-medium text-orange-400">Sign Up</span>
            </Link>
          </div>
        </form>
        {/* Google Sign-In Button */}
        <div className="mt-4 flex items-center justify-center gap-2 bg-slate-300 rounded-lg p-2 hover:bg-slate-400">
          <FcGoogle size={22} />
          <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
