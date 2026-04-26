import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../helper/SupabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [passErr, setPassError] = useState("");
  const [errMessage, setErrorMessage] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errUserName, setErrUserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const validatePassword = () => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    let message = "";
    if (password.length < 8) message += "Password must be at least 8 characters.\n";
    if (!hasUppercase) message += "Must contain at least one uppercase letter.\n";
    if (!hasLowercase) message += "Must contain at least one lowercase letter.\n";
    if (!hasNumber) message += "Must contain at least one number.\n";

    setErrorMessage(message);
    return message === "";
  };

  const sanitizeInput = (input: string) => {
    // Remove leading/trailing spaces and any suspicious characters
    return input.replace(/[<>]/g, "").trim();
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setPassError("");
    setErrEmail("");
    setErrUserName("");
    setErrorMessage("");
    setIsSubmitting(true);

    // Honeypot check
    const honeypot = (document.getElementById("signup_hp") as HTMLInputElement)?.value;
    if (honeypot) {
      setErrUserName("Bot detected.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setPassError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (email !== confirmEmail) {
      setErrEmail("Emails do not match.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword()) {
      setIsSubmitting(false);
      return;
    }

    // Check if user already exists
    const { data: existingUser, error: userError } = await supabase
      .from('applications')
      .select('email')
      .eq('email', email)
      .single();
    if (existingUser) {
      setErrEmail("An account with this email already exists.");
      setIsSubmitting(false);
      return;
    }
    if (userError && userError.code !== 'PGRST116') { // PGRST116: No rows found
      setErrEmail("Error checking user existence. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Sanitize inputs
    const safeUsername = sanitizeInput(username);
    const safeFirstName = sanitizeInput(firstName);
    const safeSecondName = sanitizeInput(secondName);
    const safeSurname = sanitizeInput(surname);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: safeUsername,
          firstName: safeFirstName,
          secondName: safeSecondName,
          surname: safeSurname,
        },
      },
    });

    if (error) {
      setErrUserName("Signup failed. Please try again."); // Generic error for user
      console.error("Signup error:", error.message); // Log actual error
      setIsSubmitting(false);
      return;
    }
    if (data) {
      console.log("User created:", data);
      await supabase.from('courses').insert([{ id: data.user?.id,  cao_course1: " "}]);
      await supabase.from('applications').insert([{ id: data.user?.id, 'first_name': safeFirstName, 'middle_name': safeSecondName, surname: safeSurname, email }]);
      // Consider using HTTP-only cookies for tokens instead of localStorage for better security
      localStorage.setItem("token", data.session?.access_token || "");
      setIsSubmitting(false);
      navigate("/confirm");
    }
  };

  return (
  <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

          {/* Error Message */}
          {errUserName && <p className="text-red-500 text-sm mb-4 text-center">{errUserName}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Honeypot field for bot protection */}
            <input type="text" id="signup_hp" name="signup_hp" style={{ display: "none" }} autoComplete="off" tabIndex={-1} />
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Second Name"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Surname*"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Email & Confirm Email */}
            <div>
              <input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Confirm Email*"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errEmail && <p className="text-red-500 text-xs mt-1">{errEmail}</p>}
            </div>

            {/* Password & Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errMessage && <pre className="text-red-500 text-xs mt-1 whitespace-pre-line">{errMessage}</pre>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password*"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {passErr && <p className="text-red-500 text-xs mt-1">{passErr}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    
  );
}