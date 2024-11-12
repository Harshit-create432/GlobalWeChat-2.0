import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-200">
          <Globe size={32} />
          <span className="text-2xl font-extrabold tracking-wide">GlobalWeChat</span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link to="/" className="hover:text-blue-300 transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-blue-300 transition-colors duration-200">Chat</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-300 transition-colors duration-200">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:bg-blue-600 bg-blue-500 text-white py-1 px-4 rounded-lg transition-all duration-200">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
