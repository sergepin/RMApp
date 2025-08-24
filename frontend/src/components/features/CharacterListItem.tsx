import React from "react";
import { Character } from "../../types/character";
import { useFavorites } from "../../hooks/useFavorites";
import { useSoftDelete } from "../../hooks/useSoftDelete";
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

interface CharacterListItemProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
  onSoftDelete?: (id: number) => void;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = ({
  character,
  isSelected,
  onClick,
  onSoftDelete,
}) => {
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();
  const { softDeleteCharacter, loading: deleteLoading } = useSoftDelete();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!favoriteLoading) {
      toggleFavorite(character.id);
    }
  };

  const handleSoftDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!deleteLoading) {
      softDeleteCharacter(character.id);
      onSoftDelete?.(character.id);
    }
  };

  const isCharacterFavorite = isFavorite(character.id);

  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 cursor-pointer transition-colors ${
        isSelected ? "bg-primary-100" : "hover:bg-gray-50"
      } border-b border-gray-200/60 last:border-b-0`}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar con highlight si es favorito */}
        <div
          className={`relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ${
            isCharacterFavorite ? "ring-2 ring-secondary-600 bg-white p-0.2" : ""
          }`}
        >
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/40x40?text=?";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {character.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{character.species}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteToggle}
            disabled={favoriteLoading}
            className={`text-lg transition-all duration-200 ${
              favoriteLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-110 cursor-pointer'
            }`}
            aria-label={isCharacterFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isCharacterFavorite ? (
              <HiHeart className="w-6 h-6 text-green-500" />
            ) : (
              <HiOutlineHeart className="w-6 h-6 text-gray-400" />
            )}
          </button>

          <button
            onClick={handleSoftDelete}
            disabled={deleteLoading}
            className="text-lg hover:scale-110 transition-transform text-gray-400 hover:text-red-500"
            aria-label="Soft delete character"
          >
            <HiOutlineTrash className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};