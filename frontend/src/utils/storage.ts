export const storage = {
  getFavorites: (): number[] => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  },

  setFavorites: (favorites: number[]): void => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },

  toggleFavorite: (characterId: number): number[] => {
    const favorites = storage.getFavorites();
    const newFavorites = favorites.includes(characterId)
      ? favorites.filter(id => id !== characterId)
      : [...favorites, characterId];
    
    storage.setFavorites(newFavorites);
    return newFavorites;
  },

  isFavorite: (characterId: number): boolean => {
    return storage.getFavorites().includes(characterId);
  }
};
