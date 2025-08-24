import React, { useState, useEffect } from 'react';
import { TwoColumnLayout } from '../components/layout/TwoColumnLayout';
import { CharacterList } from '../components/features/CharacterList';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '../types/character';

export const HomePage: React.FC = () => {
  const { characters, loading, error } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const handleFavoritesChange = () => {
      setSelectedCharacter(prev => prev);
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    return () => window.removeEventListener('favoritesChanged', handleFavoritesChange);
  }, []);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleBack = () => {
    setSelectedCharacter(null);
  };

  return (
    <TwoColumnLayout
      selectedCharacter={selectedCharacter}
      onBack={handleBack}
    >
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