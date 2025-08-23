import React, { useState, useMemo } from 'react';
import { Character } from '../../types/character';
import { CharacterListItem } from './CharacterListItem';
import { SearchBar } from './SearchBar';

interface CharacterListProps {
  characters: Character[];
  loading?: boolean;
  error?: any;
  selectedCharacterId?: number;
  onCharacterSelect: (character: Character) => void;
}

type SortOrder = 'asc' | 'desc';

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  selectedCharacterId,
  onCharacterSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedCharacters = useMemo(() => {
    // ✅ Crear una copia del array antes de filtrar y ordenar
    let filtered = [...characters];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by name
    return filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [characters, searchTerm, sortOrder]);

  const favoriteCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      localStorage.getItem('favorites')?.includes(char.id.toString())
    ), [filteredAndSortedCharacters]);

  const regularCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      !localStorage.getItem('favorites')?.includes(char.id.toString())
    ), [filteredAndSortedCharacters]);

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
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

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Rick and Morty list</h1>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSortToggle={handleSortToggle}
        sortOrder={sortOrder}
      />

      {/* Character Lists */}
      <div className="flex-1 overflow-y-auto">
        {/* Starred Characters */}
        {favoriteCharacters.length > 0 && (
          <div className="mb-6">
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Starred Characters ({favoriteCharacters.length})
            </h2>
            <div className="space-y-1">
              {favoriteCharacters.map((character) => (
                <CharacterListItem
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacterId === character.id}
                  isFavorite={true}
                  onClick={() => onCharacterSelect(character)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Characters */}
        {regularCharacters.length > 0 && (
          <div>
            <h2 className="px-4 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Characters ({regularCharacters.length})
            </h2>
            <div className="space-y-1">
              {regularCharacters.map((character) => (
                <CharacterListItem
                  key={character.id}
                  character={character}
                  isSelected={selectedCharacterId === character.id}
                  isFavorite={false}
                  onClick={() => onCharacterSelect(character)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedCharacters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No characters found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};