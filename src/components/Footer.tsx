import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Apply", href: "/application/" },
    { label: "Payment", href: "/payment/" },
  ];

  const supportLinks = [
    { label: "FAQ", href: "/Faq" },
    { label: "Contact", href: "/about/#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-105 transition-transform">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                University Portal
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Tired of application stress? We build university application
              websites that make the process painless. Join our social media for
              updates on how we're empowering learners!
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2.5 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-800 hover:bg-sky-500 rounded-lg transition-all duration-300 group"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-800 hover:bg-blue-600 rounded-lg transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:datafusioncreation@outlook.com"
                className="p-2.5 bg-gray-800 hover:bg-emerald-600 rounded-lg transition-all duration-300 group"
                aria-label="Email"
              >
                <Send className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Email
                  </p>
                  <a
                    href="mailto:datafusioncreation@outlook.com"
                    className="text-gray-300 hover:text-white transition-colors break-all"
                  >
                    datafusioncreation@outlook.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Phone
                  </p>
                  <a
                    href="tel:+27695977023"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    +27 69 597 7023
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-indigo-600 transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Location
                  </p>
                  <p className="text-gray-300">South Africa</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {currentYear} University Application Portal. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link
                to="#"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
