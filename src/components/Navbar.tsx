import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { host } from './variables';

// Dropdown Component with Delayed Hide
function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showMenu = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsOpen(true);
  };

  const hideMenu = () => {
    const id = setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setTimeoutId(id);
  };

  return (
    <div className="relative" onMouseLeave={hideMenu}>
      <div
        className="cursor-pointer px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition"
        onMouseEnter={showMenu}
      >
        {label}
      </div>
      <div
        className={`absolute bg-white shadow-lg rounded-md mt-2 w-40 z-10 border border-gray-200 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        {children}
      </div>
    </div>
  );
}

// Mobile Dropdown Toggle
function MobileDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
      >
        {label}
      </button>
      {isOpen && <div className="ml-4 mt-1 space-y-1">{children}</div>}
    </div>
  );
}

export default function Navbar() {
  const [authState, setAuthState] = useState<'checking' | 'loggedIn' | 'loggedOut'>('checking');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Validate token with server
  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined" || token === "") {
      setAuthState('loggedOut');
      return;
    }
    else {
      setAuthState('loggedIn');
    }
  };

  // Logout handler
  const logout = async () => {
      localStorage.removeItem("token");
      setAuthState('loggedOut');
      setIsMobileMenuOpen(false);
      navigate("/");
  };

  // Check login status on mount
  useEffect(() => {
    validateToken();
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLoggedIn = authState === 'loggedIn';
  const authChecking = authState === 'checking';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition duration-300"
            >
              University Portal
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition"
              >
                Home
              </Link>

              <Dropdown label="Application">
                <Link
                  to="/application/"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  Apply
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/my_application/"
                    className="block px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    Display Info
                  </Link>
                )}
              </Dropdown>

              <Link
                to="/payment/"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition"
              >
                Payment
              </Link>

              <Dropdown label="About">
                <Link
                  to="/about"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  About Us
                </Link>
                <Link
                  to="/Faq"
                  className="block px-4 py-2 text-base text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                >
                  FAQ
                </Link>
              </Dropdown>

              {/* Auth Links - Show spinner while checking */}
              {authChecking ? (
                <div className="px-3 py-2">
                  <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : !isLoggedIn ? (
                <>
                  <Link
                    to="/signup"
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-base"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-base"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          <MobileDropdown label="Application">
            <Link
              to="/application/"
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply
            </Link>
            {isLoggedIn && (
              <Link
                to="/my_application/"
                className="block px-3 py-2 rounded-md text-base text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Display Info
              </Link>
            )}
          </MobileDropdown>

          <Link
            to="/payment/"
            className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Payment
          </Link>

          <MobileDropdown label="About">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/Faq"
              className="block px-3 py-2 rounded-md text-base text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </MobileDropdown>

          {/* Auth Links - Show spinner while checking */}
          {authChecking ? (
            <div className="px-3 py-2 flex justify-center">
              <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : !isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 rounded-md text-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}