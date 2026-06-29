"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye } from "@/components/common/Icons";

const EyeOff = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        if (typeof window !== "undefined" && data.data?.token) {
          localStorage.setItem("adminToken", data.data.token);
        }
        router.push("/admin");
      } else {
        setStatus("error");
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setStatus("error");
      setError("Failed to connect to the server. Please check your connection and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-mint flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md bg-white border border-primary/5 rounded-2xl p-8 sm:p-10 shadow-xl">
        
        {/* Company Logo and Heading */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3.5 bg-primary/10 text-primary rounded-2xl">
              <Building2 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="font-poppins font-bold text-2xl text-slate-dark">
            Welcome Back
          </h1>
          <p className="font-sans text-slate-light text-sm mt-1.5">
            Admin Login &bull; I Constructions
          </p>
        </div>

        {/* Error Message area */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label htmlFor="email" className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@iconstructions.com"
              className="w-full bg-mint border border-primary/10 rounded-lg px-4 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-xs font-poppins font-bold text-slate-dark uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-mint border border-primary/10 rounded-lg pl-4 pr-12 py-3 text-sm text-slate-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-light hover:text-primary transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Options: Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-primary/20 bg-mint cursor-pointer accent-primary"
              />
              <span className="text-xs font-sans text-slate-light">Remember Me</span>
            </label>
            
            <a
              href="#forgot"
              onClick={(e) => {
                e.preventDefault();
                alert("Password recovery function is a UI placeholder. Contact system administrator for details.");
              }}
              className="text-xs font-poppins font-semibold text-primary hover:text-primary-light transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary hover:bg-primary-light disabled:bg-primary-light text-mint font-poppins font-bold py-3.5 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === "loading" ? "Verifying Credentials..." : "Access Administrator Panel"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-slate-light/65">
        &copy; {new Date().getFullYear()} I Constructions. All rights reserved.
      </footer>
    </main>
  );
}
