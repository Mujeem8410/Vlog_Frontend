import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    if(form.username === "" || form.email === "" || form.password === "") {
      toast.error("Please fill in all fields");
      return;
    }
    if(form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
    
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black  px-4">
      {/* White Register Card */}
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <input 
              type="text"
              placeholder="Username"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              onChange={(e) => setForm({ ...form, username: e.target.value })} 
              required 
            />
          </div>
          
          <div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
          </div>
          
          <div>
            <input 
              type="password" 
              placeholder="Password (min. 6 characters)" 
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
            />
          </div>

          <button 
            onClick={handleRegister} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:text-green-700 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;