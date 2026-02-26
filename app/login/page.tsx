 "use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Side — Dark Blue (Same as Sidebar) */}
        <div className="w-2/5 bg-[#1e3a6e] flex flex-col items-center justify-center p-10 text-white">
          {/* Logo Box */}
           <h1 className="text-xl font-bold text-center">Hafeez Centre</h1>
          <p className="text-blue-300 text-sm mt-1 text-center">Admin Panel</p>

          <div className="mt-10 space-y-3 w-full">
             
               
           </div>
        </div>

        {/* Right Side — White Form */}
        <div className="w-3/5 bg-white p-10 flex flex-col justify-center">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a6e]">Welcome Back!</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your admin account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-lg mb-5">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hafeez.pk"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1e3a6e] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1e3a6e] transition-colors"
              />
            </div>

            {/* Button — Yellow like Admin Panel */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#f5a623] hover:bg-[#e09610] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-sm transition-colors tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 text-xs mt-8">
            Hafeez Centre Admin Panel • Secure Login
          </p>
        </div>

      </div>
    </div>
  );
}