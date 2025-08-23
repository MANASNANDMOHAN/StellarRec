export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StellarRec™
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400">
            <p className="text-sm">
              © {currentYear} StellarRec. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <span className="text-sm">Contact:</span>
              <a 
                href="mailto:hello@stellarrec.com" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:underline"
              >
                hello@stellarrec.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
