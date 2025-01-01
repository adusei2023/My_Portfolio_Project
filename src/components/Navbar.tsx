import React, { useState } from 'react';
import AuthModal from './AuthModal';

interface NavbarProps {
  onNavigate: (section: 'projects' | 'about' | 'contact') => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <button
              onClick={() => onNavigate('projects')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                activeSection === 'projects'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                activeSection === 'about'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                activeSection === 'contact'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Contact
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar; 