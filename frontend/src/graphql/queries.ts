import { gql } from '@apollo/client';

// Queries
export const GET_FAVORITES = gql`
  query GetFavorites($session_id: String!) {
    favorites(session_id: $session_id)
  }
`;

export const IS_FAVORITE = gql`
  query IsFavorite($session_id: String!, $character_id: Int!) {
    isFavorite(session_id: $session_id, character_id: $character_id)
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($character_id: Int!) {
    comments(character_id: $character_id) {
      id
      session_id
      character_id
      text
      author_name
      created_at
      updated_at
    }
  }
`;

// Mutations
export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($session_id: String!, $character_id: Int!) {
    toggleFavorite(session_id: $session_id, character_id: $character_id) {
      success
      isFavorite
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($session_id: String!, $character_id: Int!, $text: String!, $author_name: String) {
    addComment(session_id: $session_id, character_id: $character_id, text: $text, author_name: $author_name) {
      id
      session_id
      character_id
      text
      author_name
      created_at
      updated_at
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!, $session_id: String!) {
    deleteComment(id: $id, session_id: $session_id) {
      success
    }
  }
`;
