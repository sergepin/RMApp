import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useSoftDelete = () => {
  const [deletedCharacters, setDeletedCharacters] = useState<(number | string)[]>([]);

  useEffect(() => {
    setDeletedCharacters(storage.getDeletedCharacters());

    const handleCharactersChanged = () => {
      setDeletedCharacters(storage.getDeletedCharacters());
    };

    window.addEventListener('charactersChanged', handleCharactersChanged);
    
    return () => {
      window.removeEventListener('charactersChanged', handleCharactersChanged);
    };
  }, []);

  const softDeleteCharacter = (characterId: number) => {
    storage.softDeleteCharacter(characterId);
    setDeletedCharacters(storage.getDeletedCharacters());
    window.dispatchEvent(new CustomEvent('charactersChanged'));
  };

  const restoreCharacter = (characterId: number) => {
    storage.restoreCharacter(characterId);
    setDeletedCharacters(storage.getDeletedCharacters());
    window.dispatchEvent(new CustomEvent('charactersChanged'));
  };

  const isCharacterDeleted = (characterId: number | string): boolean => {
    return deletedCharacters.includes(characterId);
  };

  const getActiveCharacters = (allCharacters: any[]): any[] => {
    return allCharacters.filter(char => !deletedCharacters.includes(char.id));
  };

  return {
    deletedCharacters,
    softDeleteCharacter,
    restoreCharacter,
    isCharacterDeleted,
    getActiveCharacters
  };
};
