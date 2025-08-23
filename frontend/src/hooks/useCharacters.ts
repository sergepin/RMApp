import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Character } from '../types/character';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String, $status: String, $species: String, $gender: String, $origin: String) {
    characters(name: $name, status: $status, species: $species, gender: $gender, origin: $origin) {
      id
      name
      species
      status
      gender
      origin
      image
    }
  }
`;

interface CharactersData {
  characters: Character[];
}

export const useCharacters = (filters?: any) => {
  const { data, loading, error } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: filters,
  });

  return {
    characters: data?.characters || [],
    loading,
    error,
  };
};
