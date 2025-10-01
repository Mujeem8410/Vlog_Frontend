export default function HomePage() {
    const handleGetStarted = () => {
        // Scroll to navbar login section
        const loginBtn = document.querySelector('[href="/login"]');
        if (loginBtn) {
            loginBtn.scrollIntoView({ behavior: 'smooth' });
            loginBtn.click();
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white text-center px-6">
      
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
         Welcome to <span className="text-blue-400">Blog Platform</span>
      </h1>
      
      {/* Tagline */}
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
        Share your thoughts, ideas, and stories with the world.  
        A simple, fast and premium blogging experience.
      </p>
      
      {/* Call to Action */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}
