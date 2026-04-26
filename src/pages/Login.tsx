import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "../helper/SupabaseClient";

const sanitizeInput = (input: string) => {
  // Remove leading/trailing spaces and any suspicious characters
  return input.replace(/[<>]/g, "").trim();
};

function Login() {
  const [values, setValues] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: sanitizeInput(e.target.value) }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: values.mail,
        password: values.password,
      });

      if (loginError) {
        setError("Login failed. Please check your credentials and try again."); // Generic error for user
        console.error("Login error:", loginError.message); // Log actual error
        return;
      }

      // Consider using HTTP-only cookies for tokens instead of localStorage for better security
      localStorage.setItem('token', data.session?.access_token || '');
      localStorage.setItem('userId', data.user?.id || '');

      if (data.session) {
        navigate(localStorage.getItem('prevPage') || '/');
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error(err);
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={login} className="space-y-4">
            <div>
              <input
                type="mail"
                name="mail"
                placeholder="example@mail.com"
                value={values.mail}
                onChange={handleInput}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleInput}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
            <div className="text-center mt-2">
              <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;