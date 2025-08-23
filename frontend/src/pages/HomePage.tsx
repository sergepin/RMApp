import React from 'react';
import { Layout } from '../components/layout/Layout';
import { CharacterList } from '../components/features/CharacterList';
import { useCharacters } from '../hooks/useCharacters';

export const HomePage: React.FC = () => {
  const { characters, loading, error } = useCharacters();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to RMApp
          </h1>
          <p className="text-gray-600 mb-8">
            Explore the Rick and Morty universe
          </p>
        </div>

        <CharacterList 
          characters={characters} 
          loading={loading} 
          error={error} 
        />
      </div>
    </Layout>
  );
};
