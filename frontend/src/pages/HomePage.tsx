import React, { useState, useEffect } from 'react';
import { TwoColumnLayout } from '../components/layout/TwoColumnLayout';
import { CharacterList } from '../components/features/CharacterList';
import { CharacterDetailPanel } from '../components/features/CharacterDetailPanel';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '../types/character';

export const HomePage: React.FC = () => {
  const { characters, loading, error } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Listen for favorites changes to re-render
  useEffect(() => {
    const handleFavoritesChange = () => {
      // Force re-render when favorites change
      setSelectedCharacter(prev => prev);
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    return () => window.removeEventListener('favoritesChanged', handleFavoritesChange);
  }, []);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <TwoColumnLayout selectedCharacter={selectedCharacter}>
      <CharacterList
        characters={characters}
        loading={loading}
        error={error}
        selectedCharacterId={selectedCharacter?.id}
        onCharacterSelect={handleCharacterSelect}
      />
    </TwoColumnLayout>
  );
};