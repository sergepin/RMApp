import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-morty-green transition-colors">
            �� RMApp
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-morty-green transition-colors">
              Characters
            </Link>
            <Link to="/favorites" className="hover:text-morty-green transition-colors">
              Favorites
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
