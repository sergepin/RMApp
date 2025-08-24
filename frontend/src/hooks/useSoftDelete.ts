import { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client/react';
import { GET_DELETED_CHARACTERS, SOFT_DELETE_CHARACTER, RESTORE_CHARACTER } from '../graphql/queries';
import { useSessionId } from './useSessionId';

interface DeletedCharacter {
  id: number;
  character_id: number;
  session_id: string;
  deleted_at: string;
}

interface DeletedCharactersData {
  deletedCharacters: DeletedCharacter[];
}

interface DeleteResponse {
  success: boolean;
}

export const useSoftDelete = () => {
  const { sessionId } = useSessionId();
  const [deletedCharacters, setDeletedCharacters] = useState<number[]>([]);
  const client = useApolloClient();

  const { data: deletedData, loading: deletedLoading, error: deletedError } = useQuery<DeletedCharactersData>(GET_DELETED_CHARACTERS, {
    variables: { session_id: sessionId },
    skip: !sessionId,
    fetchPolicy: 'network-only',
  });

  const [softDeleteMutation, { loading: deleteLoading }] = useMutation<{ softDeleteCharacter: DeleteResponse }>(SOFT_DELETE_CHARACTER, {
    onCompleted: async (data, context) => {
      const characterId = context?.variables?.character_id;
      if (characterId) {
        setDeletedCharacters(prev => [...prev, characterId]);
        
        const existingData = client.readQuery<DeletedCharactersData>({
          query: GET_DELETED_CHARACTERS,
          variables: { session_id: sessionId }
        });

        if (existingData) {
          const newDeletedCharacter: DeletedCharacter = {
            id: Date.now(), // Temporary ID
            character_id: characterId,
            session_id: sessionId,
            deleted_at: new Date().toISOString()
          };

          client.writeQuery({
            query: GET_DELETED_CHARACTERS,
            variables: { session_id: sessionId },
            data: {
              deletedCharacters: [...existingData.deletedCharacters, newDeletedCharacter]
            }
          });
        }
      }
    },
    onError: (error: Error) => {
    },
  });

  const [restoreMutation, { loading: restoreLoading }] = useMutation<{ restoreCharacter: DeleteResponse }>(RESTORE_CHARACTER, {
    onCompleted: async (data, context) => {
      const characterId = context?.variables?.character_id;
      if (characterId) {
        setDeletedCharacters(prev => prev.filter(id => id !== characterId));
        
        const existingData = client.readQuery<DeletedCharactersData>({
          query: GET_DELETED_CHARACTERS,
          variables: { session_id: sessionId }
        });

        if (existingData) {
          client.writeQuery({
            query: GET_DELETED_CHARACTERS,
            variables: { session_id: sessionId },
            data: {
              deletedCharacters: existingData.deletedCharacters.filter(
                dc => dc.character_id !== characterId
              )
            }
          });
        }
      }
    },
    onError: (error: Error) => {
    }
  });

  // Update local state when data changes
  useEffect(() => {
    if (deletedData?.deletedCharacters) {
      const newDeletedIds = deletedData.deletedCharacters.map(dc => dc.character_id);
      setDeletedCharacters(newDeletedIds);
    }
  }, [deletedData]);

  const softDeleteCharacter = async (characterId: number | string) => {
    if (!sessionId) {
      return;
    }

    const numericId = parseInt(String(characterId), 10);
    if (isNaN(numericId)) {
      return;
    }

    try {
      await softDeleteMutation({
        variables: {
          session_id: sessionId,
          character_id: numericId,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (!errorMessage.includes('already deleted') && !errorMessage.includes('validation error')) {
        }
      }
    }
  };

  const restoreCharacter = async (characterId: number | string) => {
    if (!sessionId) return;

    const numericId = parseInt(String(characterId), 10);
    if (isNaN(numericId)) {
      return;
    }

    try {
      await restoreMutation({
        variables: {
          session_id: sessionId,
          character_id: numericId,
        },
      });
    } catch (error) {
    }
  };

  const isCharacterDeleted = (characterId: number | string): boolean => {
    const numericId = parseInt(String(characterId), 10);
    if (isNaN(numericId)) return false;
    return deletedCharacters.includes(numericId);
  };

  const getActiveCharacters = (allCharacters: any[]): any[] => {
    const active = allCharacters.filter(char => !isCharacterDeleted(char.id));
    return active;
  };

  return {
    deletedCharacters,
    softDeleteCharacter,
    restoreCharacter,
    isCharacterDeleted,
    getActiveCharacters,
    deletedData,
    loading: deletedLoading || deleteLoading || restoreLoading,
    error: deletedError,
  };
};
