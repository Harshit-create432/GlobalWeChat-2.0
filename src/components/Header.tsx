import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Globe size={32} />
          <span className="text-2xl font-bold">GlobalWeChat</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/chat" className="hover:text-blue-200">Chat</Link></li>
            <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-200">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;