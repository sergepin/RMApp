import React from 'react';
import { Character } from '../../types/character';
import { storage } from '../../utils/storage';
import { CommentsSection } from './CommentSection';

interface CharacterDetailPanelProps {
  character: Character;
}

export const CharacterDetailPanel: React.FC<CharacterDetailPanelProps> = ({ character }) => {
  const isFavorite = storage.isFavorite(character.id);

  const handleFavoriteToggle = () => {
    storage.toggleFavorite(character.id);
    // Force re-render
    window.location.reload();
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
    <div className="max-w-2xl mx-auto">
      {/* Character Avatar */}
      <div className="relative mb-8">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute bottom-4 right-1/2 transform translate-x-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFavorite ? (
            <span className="text-green-500 text-2xl">❤️</span>
          ) : (
            <span className="text-gray-400 text-2xl">🤍</span>
          )}
        </button>
      </div>

      {/* Character Name */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        {character.name}
      </h1>

      {/* Character Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 font-medium w-24">Species:</span>
          <span className="text-gray-800">{character.species}</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 font-medium w-24">Status:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(character.status)}`}></div>
            <span className="text-gray-800 capitalize">{character.status}</span>
          </div>
        </div>
        
        {character.gender && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium w-24">Gender:</span>
            <span className="text-gray-800 capitalize">{character.gender}</span>
          </div>
        )}
        
        {character.origin && (
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 font-medium w-24">Origin:</span>
            <span className="text-gray-800">{character.origin}</span>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <CommentsSection characterId={character.id} />
    </div>
  );
};