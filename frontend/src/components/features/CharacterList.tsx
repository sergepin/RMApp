import React, { useState, useMemo } from 'react';
import { Character } from '../../types/character';
import { CharacterListItem } from './CharacterListItem';
import { SearchBar } from './SearchBar';
import { AdvancedFilters } from './AdvancedFilters';
import { DeletedCharactersManager } from './DeletedCharactersManager';
import { storage } from '../../utils/storage';
import { HiTrash } from 'react-icons/hi';

interface CharacterListProps {
  characters: Character[];
  loading?: boolean;
  error?: any;
  selectedCharacterId?: number;
  onCharacterSelect: (character: Character) => void;
}

type SortOrder = 'asc' | 'desc';

interface Filters {
  status: string;
  species: string;
  gender: string;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  loading,
  error,
  selectedCharacterId,
  onCharacterSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showDeletedManager, setShowDeletedManager] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: '',
    species: '',
    gender: ''
  });

  const filteredAndSortedCharacters = useMemo(() => {
    // ✅ Filtrar personajes eliminados primero
    let filtered = storage.getActiveCharacters(characters);
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by advanced filters
    if (filters.status) {
      filtered = filtered.filter(character => 
        character.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.species) {
      filtered = filtered.filter(character => 
        character.species.toLowerCase() === filters.species.toLowerCase()
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(character => 
        character.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }
    
    // Sort by name
    return filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [characters, searchTerm, sortOrder, filters]);

  const favoriteCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      storage.isFavorite(char.id)
    ), [filteredAndSortedCharacters]);

  const regularCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      !storage.isFavorite(char.id)
    ), [filteredAndSortedCharacters]);

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      species: '',
      gender: ''
    });
  };

  const handleToggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleSoftDelete = (characterId: number) => {
    // Force re-render
    window.dispatchEvent(new CustomEvent('charactersChanged'));
  };

  const handleRestore = (characterId: number) => {
    // Force re-render
    window.dispatchEvent(new CustomEvent('charactersChanged'));
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Rick and Morty list</h1>
            <button
              onClick={() => setShowDeletedManager(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium
                        bg-red-50 text-red-700 rounded-xl shadow-sm
                        hover:bg-red-100 hover:shadow transition-all"
            >
              <HiTrash className="w-5 h-5 text-red-500" />
              <span>Deleted</span>
              <span className="ml-1 px-2 py-0.5 text-xs font-semibold
                              bg-red-500 text-white rounded-full">
                {storage.getDeletedCharacters().length}
              </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSortToggle={handleSortToggle}
        sortOrder={sortOrder}
        showAdvancedFilters={showAdvancedFilters}
        onToggleAdvancedFilters={handleToggleAdvancedFilters}
      />

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <AdvancedFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          showAdvancedFilters={showAdvancedFilters}
          onToggleAdvancedFilters={handleToggleAdvancedFilters}
        />
      )}

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
                  onSoftDelete={handleSoftDelete}
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
                  onSoftDelete={handleSoftDelete}
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

      {/* Deleted Characters Manager */}
      <DeletedCharactersManager
        characters={characters}
        onRestore={handleRestore}
        isOpen={showDeletedManager}
        onClose={() => setShowDeletedManager(false)}
      />
    </div>
  );
};