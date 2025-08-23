import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../../types/character';
import { storage } from '../../utils/storage';

interface CharacterCardProps {
  character: Character;
  onFavoriteToggle?: (characterId: number) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  onFavoriteToggle 
}) => {
  const isFavorite = storage.isFavorite(character.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    storage.toggleFavorite(character.id);
    onFavoriteToggle?.(character.id);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link to={`/character/${character.id}`}>
      <div className="card p-4 hover:scale-105 transition-transform cursor-pointer">
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <span className="text-red-500 text-xl">❤️</span>
            ) : (
              <span className="text-gray-400 text-xl">��</span>
            )}
          </button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {character.name}
          </h3>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}></div>
            <span className="text-sm text-gray-600 capitalize">
              {character.status}
            </span>
          </div>
          
          <p className="text-sm text-gray-600">
            {character.species}
          </p>
          
          {character.gender && (
            <p className="text-sm text-gray-500 capitalize">
              {character.gender}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
