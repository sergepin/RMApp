import React from "react";
import { Character } from "../../types/character";
import { storage } from "../../utils/storage";
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

interface CharacterListItemProps {
  character: Character;
  isSelected: boolean;
  isFavorite: boolean;
  onClick: () => void;
  onSoftDelete?: (id: number) => void;
}

export const CharacterListItem: React.FC<CharacterListItemProps> = ({
  character,
  isSelected,
  isFavorite,
  onClick,
  onSoftDelete,
}) => {
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    storage.toggleFavorite(character.id);
    window.dispatchEvent(new CustomEvent("favoritesChanged"));
  };

  const handleSoftDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSoftDelete?.(character.id);
  };

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
            isFavorite ? "ring-2 ring-white bg-white p-0.5" : ""
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

        {/* Character Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-800 truncate">
            {character.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{character.species}</p>
        </div>

        {/* Favorite + Soft Delete */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteToggle}
            className="text-lg hover:scale-110 transition-transform"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HiHeart className="w-6 h-6 text-green-500" />
            ) : (
              <HiOutlineHeart className="w-6 h-6 text-gray-400" />
            )}
          </button>

          <button
            onClick={handleSoftDelete}
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
