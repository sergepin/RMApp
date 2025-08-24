import React, { useState, useMemo } from 'react';
import { Character } from '../../types/character';
import { CharacterListItem } from './CharacterListItem';
import { SearchBar } from './SearchBar';
import { AdvancedFilters } from './AdvancedFilters';
import { DeletedCharactersManager } from './DeletedCharactersManager';
import { useFavorites } from '../../hooks/useFavorites';
import { useSoftDelete } from '../../hooks/useSoftDelete';
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

  const { favorites, isFavorite } = useFavorites();
  const { getActiveCharacters, deletedCharacters } = useSoftDelete();

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = getActiveCharacters ? getActiveCharacters(characters) : characters;

    if (searchTerm) {
      filtered = filtered.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.species.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
    
    return filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [characters, searchTerm, sortOrder, filters, deletedCharacters, getActiveCharacters]);

  const favoriteCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      isFavorite(char.id)
    ), [filteredAndSortedCharacters, isFavorite]);

  const regularCharacters = useMemo(() => 
    filteredAndSortedCharacters.filter(char => 
      !isFavorite(char.id)
    ), [filteredAndSortedCharacters, isFavorite]);

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

  const { softDeleteCharacter, restoreCharacter } = useSoftDelete();

  const hasActiveFilters = filters.status || filters.species || filters.gender;
  const activeFiltersCount = [filters.status, filters.species, filters.gender].filter(Boolean).length;

  const handleSoftDelete = (characterId: number) => {
    softDeleteCharacter(characterId);
  };

  const handleRestore = (characterId: number) => {
    restoreCharacter(characterId);
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
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="/portal.png" 
            alt="Portal" 
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r to-primary-700 from-secondary-600 bg-clip-text text-transparent">
            Multiverse Explorer
          </h1>
        </div>

        {/* Contador de filtros activos */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600">Active filters:</span>
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSortToggle={handleSortToggle}
              sortOrder={sortOrder}
              showAdvancedFilters={showAdvancedFilters}
              onToggleAdvancedFilters={handleToggleAdvancedFilters}
            />
          </div>
          
          <button
            onClick={() => setShowDeletedManager(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium
                      text-gray-600 hover:text-gray-800 hover:bg-gray-50 
                      rounded-lg transition-all duration-200 group"
          >
            <HiTrash className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Deleted</span>
            {deletedCharacters.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold
                              bg-gray-200 text-gray-700 rounded-full min-w-[20px] text-center
                              group-hover:bg-gray-300 transition-colors">
                {deletedCharacters.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <AdvancedFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          showAdvancedFilters={showAdvancedFilters}
          onToggleAdvancedFilters={handleToggleAdvancedFilters}
        />
      )}

      <div className="flex-1 overflow-y-auto">
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
                  onClick={() => onCharacterSelect(character)}
                  onSoftDelete={handleSoftDelete}
                />
              ))}
            </div>
          </div>
        )}

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
                  onClick={() => onCharacterSelect(character)}
                  onSoftDelete={handleSoftDelete}
                />
              ))}
            </div>
          </div>
        )}

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

      <DeletedCharactersManager
        characters={characters}
        onRestore={handleRestore}
        isOpen={showDeletedManager}
        onClose={() => setShowDeletedManager(false)}
      />
    </div>
  );
};