import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "../helper/SupabaseClient";

const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, "").trim();
};

function Login() {
  const [values, setValues] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: sanitizeInput(e.target.value) }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: values.mail,
        password: values.password,
      });

      if (loginError) {
        setError("Login failed. Please check your credentials and try again.");
        console.error("Login error:", loginError.message);
        return;
      }

      localStorage.setItem('token', data.session?.access_token || '');
      localStorage.setItem('userId', data.user?.id || '');

      if (data.session) {
        const prev = localStorage.getItem('prevPage');
        window.location.hash = prev?.includes('#') ? prev.split('#')[1] : prev || '/';
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Branding Panel */}
          <div className="hidden lg:flex lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-900 text-white flex-col p-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/25 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 -left-16 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
            </div>

            <div className="relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5.1L12 3.9 3 8.9 12 14zm0 0l9 5.1-9 5.1-9-5.1L12 14zm0 0v9" />
                  </svg>
                </div>
                <div>
                  <p className="text-xl font-bold leading-tight">UniApply</p>
                  <p className="text-sm text-blue-200/80">Your university, one form away</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center my-6">
              <h3 className="text-2xl font-bold leading-snug mb-3">
                Apply to multiple universities with a single form.
              </h3>
              <p className="text-blue-100/80 leading-relaxed text-sm mb-6">
                Sign in to track your applications, upload documents, and monitor admissions decisions — all in one dashboard.
              </p>

              <div className="space-y-3">
                {[
                  "Real-time application tracking",
                  "AI-powered university matching",
                  "Secure document storage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-blue-100/90">
                    <span className="w-5 h-5 rounded-full bg-green-400/20 border border-green-300/30 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 shrink-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5">
              <p className="text-sm text-blue-100/90 leading-relaxed">
                "I applied to 5 universities in under 30 minutes. Got accepted to my dream program within 2 weeks!"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-bold text-sm">
                  T
                </div>
                <div>
                  <p className="text-sm font-semibold">Thabo M.</p>
                  <p className="text-xs text-blue-200/70">UJ Student, BCom Accounting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-3 flex items-center">
            <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
              {/* Mobile branding */}
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5.1L12 3.9 3 8.9 12 14zm0 0l9 5.1-9 5.1-9-5.1L12 14zm0 0v9" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-slate-900">UniApply</p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                <p className="text-sm text-slate-500 mt-1.5">Sign in to access your application dashboard.</p>
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={login} className="space-y-5">
                <div>
                  <label htmlFor="mail" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <input
                      id="mail"
                      type="email"
                      name="mail"
                      placeholder="example@mail.com"
                      value={values.mail}
                      onChange={handleInput}
                      required
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleInput}
                      required
                      autoComplete="current-password"
                      className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{" "}
                  <span className="text-slate-600">Contact support to create one.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
