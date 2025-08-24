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
  },

  getDeletedCharacters: (): number[] => {
    try {
      return JSON.parse(localStorage.getItem('deleted_characters') || '[]');
    } catch {
      return [];
    }
  },

  setDeletedCharacters: (deletedIds: number[]): void => {
    localStorage.setItem('deleted_characters', JSON.stringify(deletedIds));
  },

  softDeleteCharacter: (characterId: number): void => {
    const deletedIds = storage.getDeletedCharacters();
    if (!deletedIds.includes(characterId)) {
      storage.setDeletedCharacters([...deletedIds, characterId]);
    }
  },

  restoreCharacter: (characterId: number): void => {
    const deletedIds = storage.getDeletedCharacters();
    storage.setDeletedCharacters(deletedIds.filter(id => id !== characterId));
  },

  isCharacterDeleted: (characterId: number): boolean => {
    return storage.getDeletedCharacters().includes(characterId);
  },

  getActiveCharacters: (allCharacters: any[]): any[] => {
    const deletedIds = storage.getDeletedCharacters();
    return allCharacters.filter(char => !deletedIds.includes(char.id));
  }
};