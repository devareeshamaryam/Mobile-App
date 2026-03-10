 "use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Random math question generator ──────────────────────────
function generateQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const ops = ["+", "-", "*"] as const;
  const op  = ops[Math.floor(Math.random() * ops.length)];
  let answer: number;
  if (op === "+") answer = a + b;
  else if (op === "-") answer = a - b;
  else answer = a * b;
  return { question: `${a} ${op} ${b}`, answer };
}

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  // ── Captcha state ────────────────────────────────────────
  const [captcha, setCaptcha]         = useState({ question: "", answer: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  useEffect(() => {
    setCaptcha(generateQuestion());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateQuestion());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCaptchaError("");

    // ── Captcha check ──────────────────────────────────────
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError("Jawab galat hai! Dobara try karein.");
      refreshCaptcha();
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    refreshCaptcha(); // har attempt ke baad naya captcha

    if (result?.error) {
      const err = result.error;
      if (err.startsWith("IP_BLOCKED:")) {
        const mins = err.split(":")[1];
        setError(`⛔ Aapki IP ${mins} minute ke liye block ho gayi hai. Zyada galat attempts ki wajah se.`);
      } else if (err.startsWith("INVALID_CREDENTIALS:")) {
        const remaining = err.split(":")[1];
        setError(`❌ Email ya password galat hai. ${remaining} attempts baqi hain.`);
      } else {
        setError("❌ Email ya password galat hai.");
      }
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Side */}
        <div className="w-2/5 bg-[#1e3a6e] flex flex-col items-center justify-center p-10 text-white">
          <h1 className="text-xl font-bold text-center">Hafeez Centre</h1>
          <p className="text-blue-300 text-sm mt-1 text-center">Admin Panel</p>
        </div>

        {/* Right Side */}
        <div className="w-3/5 bg-white p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1e3a6e]">Welcome Back!</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your admin account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
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

            {/* ── Math Captcha ── */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Security Check
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-[#1e3a6e] text-white font-bold px-4 py-3 rounded-lg text-sm tracking-widest select-none">
                  {captcha.question} = ?
                </div>
                <input
                  type="number"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Jawab"
                  required
                  className="w-24 px-3 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#1e3a6e] transition-colors"
                />
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-xs text-[#1e3a6e] underline hover:text-blue-800"
                >
                  Refresh
                </button>
              </div>
              {captchaError && (
                <p className="text-red-500 text-xs mt-1">{captchaError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5123f5] hover:bg-[#e09610] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg text-sm transition-colors tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            Hafeez Centre Admin Panel • Secure Login
          </p>
        </div>
      </div>
    </div>
  );
}