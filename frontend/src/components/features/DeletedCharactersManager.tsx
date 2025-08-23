import React, { useState, useEffect } from 'react';
import { Character } from '../../types/character';
import { storage } from '../../utils/storage';

interface DeletedCharactersManagerProps {
  characters: Character[];
  onRestore: (characterId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DeletedCharactersManager: React.FC<DeletedCharactersManagerProps> = ({
  characters,
  onRestore,
  isOpen,
  onClose
}) => {
  const [deletedCharacters, setDeletedCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const deletedIds = storage.getDeletedCharacters();
    const deleted = characters.filter(char => deletedIds.includes(char.id));
    setDeletedCharacters(deleted);
  }, [characters, isOpen]);

  const handleRestore = (characterId: number) => {
    storage.restoreCharacter(characterId);
    onRestore(characterId);
    setDeletedCharacters(prev => prev.filter(char => char.id !== characterId));
  };

  const handlePermanentDelete = (characterId: number) => {
    if (window.confirm('Are you sure you want to permanently delete this character? This action cannot be undone.')) {
      // Remove from favorites too
      const favorites = storage.getFavorites();
      if (favorites.includes(characterId)) {
        storage.setFavorites(favorites.filter(id => id !== characterId));
      }
      storage.restoreCharacter(characterId); // Remove from deleted list
      onRestore(characterId);
      setDeletedCharacters(prev => prev.filter(char => char.id !== characterId));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Deleted Characters ({deletedCharacters.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-64">
          {deletedCharacters.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No deleted characters
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {deletedCharacters.map((character) => (
                <div key={character.id} className="p-4 flex items-center space-x-3">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/40x40?text=?';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800 truncate">
                      {character.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {character.species}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRestore(character.id)}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(character.id)}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};