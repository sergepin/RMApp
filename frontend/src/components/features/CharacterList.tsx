import React, { useState, useMemo } from 'react';
import { CharacterCard } from './CharacterCard';
import { Character } from '../../types/character';

interface CharacterListProps {
  characters: Character[];
  loading?: boolean;
  error?: any;
}

type SortOrder = 'asc' | 'desc';

export const CharacterList: React.FC<CharacterListProps> = ({ 
  characters, 
  loading, 
  error 
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [characters, sortOrder]);

  const handleFavoriteToggle = (characterId: number) => {
    // Trigger re-render when favorites change
    // This will be handled by the parent component
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Error loading characters
        </h3>
        <p className="text-gray-600">
          {error.message || 'Something went wrong. Please try again.'}
        </p>
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No characters found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Characters ({characters.length})
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by name:</span>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn-primary text-sm"
          >
            {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {sortedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};
