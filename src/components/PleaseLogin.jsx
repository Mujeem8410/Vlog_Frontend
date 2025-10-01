import { FiLogIn, FiUserPlus, FiAlertCircle, FiArrowRight } from "react-icons/fi";

function PleaseLogin() {
  const handleGetStarted = () => {
    // Scroll to navbar login section
    const loginBtn = document.querySelector('[href="/login"]');
    if (loginBtn) {
      loginBtn.scrollIntoView({ behavior: 'smooth' });
      loginBtn.click();
    }
  };
  const handleRegister = () => {
    // Scroll to navbar register section
    const registerBtn = document.querySelector('[href="/register"]');
    if (registerBtn) {
      registerBtn.scrollIntoView({ behavior: 'smooth' });
      registerBtn.click();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-800 to-black"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-purple-400/20 rounded-full blur-lg animate-float delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-400/30 rounded-full blur-lg animate-float delay-2000"></div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/30 transform hover:scale-105 transition-all duration-300">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg">
              <FiAlertCircle className="text-white text-2xl" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
          Session <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expired</span>
        </h2>

        {/* Message */}
        <div className="space-y-3 mb-6">
          <p className="text-lg text-gray-600 font-medium">
            You've been logged out
          </p>
          <p className="text-gray-500 leading-relaxed">
            Please sign in again to access your dashboard and continue your journey.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button 
            onClick={handleGetStarted}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FiLogIn className="text-lg" />
            Sign In
          </button>
          
          <button onClick={handleRegister} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-gray-300 flex items-center justify-center gap-2">
            <FiUserPlus className="text-lg" />
            Register
          </button>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center justify-center gap-1">
            <FiArrowRight className="text-blue-500" />
            Use the navigation menu to access login options
          </p>
        </div>

        {/* Decorative Corner Accents */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-blue-500 rounded-tl-lg"></div>
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-purple-500 rounded-tr-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-purple-500 rounded-bl-lg"></div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-blue-500 rounded-br-lg"></div>
      </div>

   
     
    </div>
  );
}

export default PleaseLogin;