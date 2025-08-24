import React from 'react';
import { Character } from '../../types/character';
import { useFavorites } from '../../hooks/useFavorites';
import { CommentsSection } from './CommentSection';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

interface CharacterDetailPanelProps {
  character: Character;
}

export const CharacterDetailPanel: React.FC<CharacterDetailPanelProps> = ({ character }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    toggleFavorite(character.id);
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
    <div className="max-w-xl md:max-w-2xl mx-auto px-4 py-6">
      {/* Avatar + botón de favorito en círculo blanco */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-28 h-28 rounded-full object-cover shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-colors"
          aria-label={isFavorite(character.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(character.id) ? (
            <HiHeart className="w-5 h-5 text-green-500" />
          ) : (
            <HiOutlineHeart className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Nombre */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
        {character.name}
      </h1>

      {/* Detalles con separadores suaves */}
      <div className="divide-y divide-gray-200 mb-8">
        <div className="py-3">
          <h3 className="text-sm font-medium text-gray-500">Specie</h3>
          <p className="text-gray-900">{character.species}</p>
        </div>

        <div className="py-3">
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${getStatusColor(character.status)}`} />
            <p className="text-gray-900 capitalize">{character.status}</p>
          </div>
        </div>

        {character.gender && (
          <div className="py-3">
            <h3 className="text-sm font-medium text-gray-500">Gender</h3>
            <p className="text-gray-900 capitalize">{character.gender}</p>
          </div>
        )}

        {character.origin && (
          <div className="py-3">
            <h3 className="text-sm font-medium text-gray-500">Origin</h3>
            <p className="text-gray-900">{character.origin}</p>
          </div>
        )}
      </div>

      {/* Comentarios */}
      <CommentsSection characterId={character.id} />
    </div>
  );
};
