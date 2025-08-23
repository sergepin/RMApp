import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Character } from '../types/character';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
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

interface CharacterData {
  character: Character;
}

export const useCharacter = (id: string) => {
  const { data, loading, error } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id },
  });

  return {
    character: data?.character,
    loading,
    error,
  };
};
