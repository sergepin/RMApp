import { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client/react';
import { GET_FAVORITES, TOGGLE_FAVORITE } from '../graphql/queries';
import { useSessionId } from './useSessionId';

interface FavoritesData {
  favorites: number[];
}

interface ToggleFavoriteData {
  toggleFavorite: {
    success: boolean;
    isFavorite: boolean;
  };
}

export const useFavorites = () => {
  const { sessionId } = useSessionId();
  const [favorites, setFavorites] = useState<number[]>([]);
  const client = useApolloClient();

  // Query to get all favorites
  const { 
    data: favoritesData, 
    loading: favoritesLoading, 
    error: favoritesError, 
    refetch 
  } = useQuery<FavoritesData>(GET_FAVORITES, {
    variables: { session_id: sessionId },
    skip: !sessionId,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  // Mutation to toggle favorite
  const [toggleFavoriteMutation, { loading: toggleLoading }] = useMutation<ToggleFavoriteData>(TOGGLE_FAVORITE, {
    onCompleted: async (data: ToggleFavoriteData) => {
      if (data.toggleFavorite.success) {
        await refetch();
      }
    },
    onError: (error: Error) => {
      console.error('Error toggling favorite:', error);
      refetch();
    },
  });

  // Update local state when data changes from the server
  useEffect(() => {
    if (favoritesData?.favorites) {
      setFavorites(favoritesData.favorites);
    }
  }, [favoritesData]);

  // Load favorites when sessionId changes
  useEffect(() => {
    if (sessionId) {
      refetch();
    }
  }, [sessionId, refetch]);

  const toggleFavorite = async (characterId: number | string) => {
    if (!sessionId) return;

    // Convert to number and validate
    const numericId = parseInt(String(characterId), 10);
    if (isNaN(numericId)) {
      console.error('Invalid character ID:', characterId);
      return;
    }

    try {
      await toggleFavoriteMutation({
        variables: {
          session_id: sessionId,
          character_id: numericId,
        },
      });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const isFavorite = (characterId: number | string) => {
    const numericId = parseInt(String(characterId), 10);
    if (isNaN(numericId)) return false;
    return favorites.includes(numericId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loading: favoritesLoading || toggleLoading,
    error: favoritesError,
    refetch,
  };
};