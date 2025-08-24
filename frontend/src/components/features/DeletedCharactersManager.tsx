import React, { useState, useEffect } from 'react';
import { Character } from '../../types/character';
import { useSoftDelete } from '../../hooks/useSoftDelete';
import { HiX } from 'react-icons/hi';

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
  const { deletedCharacters: deletedIds, restoreCharacter } = useSoftDelete();

  useEffect(() => {
    const deleted = characters.filter(char => deletedIds.includes(Number(char.id)));
    setDeletedCharacters(deleted);
  }, [characters, deletedIds, isOpen]);

  const handleRestore = (characterId: number | string) => {
    const numericId = Number(characterId);
    restoreCharacter(numericId);
    onRestore(numericId);
    setDeletedCharacters(prev => prev.filter(char => Number(char.id) !== numericId));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
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
              <HiX className="h-6 w-6" />
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
              {deletedCharacters.map((character: any) => (
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