import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar({ isAuth, setAuth }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-extrabold text-2xl tracking-wide">
            MyBlog
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-yellow-400 font-medium transition">
              Home
            </Link>
            {isAuth && (
              <Link to="/dashboard" className="text-white hover:text-yellow-400 font-medium transition">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white text-indigo-700 font-semibold hover:bg-gray-200 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-600"
            >
              Home
            </Link>
            {isAuth && (
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-white hover:bg-indigo-600"
              >
                Dashboard
              </Link>
            )}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md bg-red-500 text-white font-semibold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md bg-yellow-400 text-black font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md bg-white text-indigo-700 font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
