import React from 'react';
import { Character } from '../../types/character';
import { storage } from '../../utils/storage';

interface CharacterListItemProps {
  character: Character;
  isSelected: boolean;
  isFavorite: boolean;
  onClick: () => void;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = ({
  character,
  isSelected,
  isFavorite,
  onClick
}) => {
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.toggleFavorite(character.id);
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer transition-colors ${
        isSelected 
          ? 'bg-primary-100 border-r-4 border-primary-600' 
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <img
          src={character.image}
          alt={character.name}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/40x40?text=?';
          }}
        />
        
        {/* Character Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {character.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {character.species}
          </p>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="text-lg hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <span className="text-green-500">❤️</span>
          ) : (
            <span className="text-gray-300">🤍</span>
          )}
        </button>
      </div>
    </div>
  );
};