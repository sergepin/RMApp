import React from 'react';
import { HiExternalLink, HiHeart } from 'react-icons/hi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex items-center justify-center">
        <p className="text-sm text-gray-600">
          Made with{' '}
          <HiHeart className="inline w-4 h-4 text-red-500 mx-1" />
          {' '}by{' '}
          <a 
            href="https://www.sergiopinzon.dev/en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors inline-flex items-center gap-1"
          >
            Sergio Pinzón
            <HiExternalLink className="w-3 h-3" />
          </a>
          {' '}© {currentYear}
        </p>
      </div>
    </footer>
  );
};
