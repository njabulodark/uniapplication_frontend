import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../helper/SupabaseClient";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Password — University Portal";

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY" && session) {
          setSessionReady(true);
          setChecking(false);
        }
      }
    );

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSessionReady(true);
      }
      setChecking(false);
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getStrength = (pw: string) => {
    if (!pw) return { label: "", percent: 0, color: "bg-slate-200" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) return { label: "Weak", percent: 20, color: "bg-red-500" };
    if (score === 2) return { label: "Fair", percent: 40, color: "bg-orange-400" };
    if (score === 3) return { label: "Good", percent: 60, color: "bg-amber-400" };
    if (score === 4) return { label: "Strong", percent: 80, color: "bg-emerald-500" };
    return { label: "Very strong", percent: 100, color: "bg-emerald-600" };
  };

  const strength = getStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message || "Failed to update password. Please try again.");
      } else {
        setMessage("Password updated successfully!");
        setTimeout(() => navigate("/login"), 2500);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg
      className="w-5 h-5 text-slate-400 group-hover/eye:text-indigo-500 transition-colors duration-200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      {open ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      )}
    </svg>
  );

  const requirements = [
    { met: password.length >= 8, label: "At least 8 characters" },
    { met: /[A-Z]/.test(password), label: "One uppercase letter" },
    { met: /[0-9]/.test(password), label: "One number" },
    { met: /[^A-Za-z0-9]/.test(password), label: "One special character" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />

      <main className="flex-1 relative flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950" />

        {/* Ambient orbs */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-indigo-600/20 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-purple-600/15 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative z-10 w-full max-w-[420px]">
          {/* Card */}
          <div className="relative bg-white/[0.07] backdrop-blur-2xl rounded-3xl border border-white/[0.08] shadow-[0_8px_64px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Top gradient accent strip */}
            <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />

            <div className="p-6 sm:p-8">
              {/* Shield icon */}
              <div className="flex justify-center mb-5 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/30 rounded-2xl blur-xl scale-150" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 ring-1 ring-white/10">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-1.5">
                Update Password
              </h1>
              <p className="text-sm text-slate-400 text-center mb-6 sm:mb-8 leading-relaxed">
                Choose a strong new password to secure your account.
              </p>

              {/* --- State: Checking session --- */}
              {checking && (
                <div className="flex flex-col items-center gap-3 py-10 sm:py-12">
                  <div className="relative">
                    <div className="w-10 h-10 border-[3px] border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 w-10 h-10 border-[3px] border-transparent border-t-indigo-500 rounded-full animate-spin" />
                  </div>
                  <p className="text-sm text-slate-400">Verifying your reset link…</p>
                </div>
              )}

              {/* --- State: No session / expired --- */}
              {!checking && !sessionReady && (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-red-500/20">
                    <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p className="text-white font-semibold text-base mb-1.5">Invalid or expired link</p>
                  <p className="text-sm text-slate-400 mb-6 max-w-[280px] mx-auto leading-relaxed">
                    This password reset link is no longer valid. Please request a new one.
                  </p>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    Request New Link
                  </button>
                </div>
              )}

              {/* --- State: Session ready, show form --- */}
              {!checking && sessionReady && (
                <>
                  {/* Success */}
                  {message && (
                    <div className="flex items-start gap-3 p-3.5 sm:p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-5 animate-[fadeIn_0.3s_ease-out]">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-emerald-300 font-medium leading-snug">{message}</p>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-3 p-3.5 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-5 animate-[fadeIn_0.3s_ease-out]">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-sm text-red-300 font-medium leading-snug">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* New Password */}
                    <div>
                      <label htmlFor="update-new-password" className="block text-sm font-medium text-slate-300 mb-2">
                        New Password
                      </label>
                      <div className="relative group">
                        <input
                          id="update-new-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-4 py-3 sm:py-3.5 pr-12 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 focus:bg-white/[0.08] transition-all duration-200 text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="group/eye absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                          tabIndex={-1}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          <EyeIcon open={showPassword} />
                        </button>
                      </div>

                      {/* Strength bar */}
                      {password && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-wider">Strength</span>
                            <span className={`text-[11px] sm:text-xs font-semibold tracking-wide ${
                              strength.percent <= 20 ? 'text-red-400' :
                              strength.percent <= 40 ? 'text-orange-400' :
                              strength.percent <= 60 ? 'text-amber-400' :
                              'text-emerald-400'
                            }`}>
                              {strength.label}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ease-out ${strength.color}`}
                              style={{ width: `${strength.percent}%` }}
                            />
                          </div>

                          {/* Requirements checklist */}
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1">
                            {requirements.map((req, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  req.met ? 'bg-emerald-500/20' : 'bg-white/[0.06]'
                                }`}>
                                  {req.met ? (
                                    <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    <div className="w-1 h-1 bg-slate-500 rounded-full" />
                                  )}
                                </div>
                                <span className={`text-[11px] transition-colors duration-200 ${
                                  req.met ? 'text-slate-300' : 'text-slate-500'
                                }`}>
                                  {req.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="update-confirm-password" className="block text-sm font-medium text-slate-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <input
                          id="update-confirm-password"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className={`w-full px-4 py-3 sm:py-3.5 pr-12 bg-white/[0.06] border rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white/[0.08] transition-all duration-200 text-sm sm:text-base ${
                            passwordsMismatch
                              ? 'border-red-500/40 focus:ring-red-500/30'
                              : passwordsMatch
                              ? 'border-emerald-500/40 focus:ring-emerald-500/30'
                              : 'border-white/[0.08] focus:ring-indigo-500/50'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="group/eye absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10 transition-colors"
                          tabIndex={-1}
                          aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                        >
                          <EyeIcon open={showConfirm} />
                        </button>
                      </div>

                      {/* Match feedback */}
                      <div className="h-5 mt-1.5">
                        {passwordsMatch && (
                          <p className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium animate-[fadeIn_0.2s_ease-out]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Passwords match
                          </p>
                        )}
                        {passwordsMismatch && (
                          <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium animate-[fadeIn_0.2s_ease-out]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Passwords don't match
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !passwordsMatch || strength.percent < 20}
                      className="relative w-full py-3 sm:py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-600 hover:to-purple-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:from-indigo-500 disabled:hover:to-purple-600 disabled:active:scale-100 flex items-center justify-center gap-2 overflow-hidden group"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

                      {loading ? (
                        <>
                          <div className="relative w-5 h-5">
                            <div className="absolute inset-0 border-2 border-white/20 rounded-full" />
                            <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin" />
                          </div>
                          <span>Updating…</span>
                        </>
                      ) : (
                        <span>Update Password</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Back to login */}
          <div className="text-center mt-5 sm:mt-6">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to login
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
