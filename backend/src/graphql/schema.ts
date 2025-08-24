import { gql } from "graphql-tag";

const typeDefs = gql`
  type Character {
    id: ID!
    name: String!
    species: String
    status: String
    gender: String
    origin: String
    image: String
  }

  type Comment {
    id: ID!
    session_id: String!
    character_id: Int!
    text: String!
    author_name: String
    created_at: String!
    updated_at: String!
  }

  type DeletedCharacter {
    id: ID!
    character_id: Int!
    session_id: String!
    deleted_at: String!
  }

  type FavoriteResponse {
    success: Boolean!
    isFavorite: Boolean!
  }

  type DeleteResponse {
    success: Boolean!
  }

  type Query {
    characters(
      name: String
      status: String
      species: String
      gender: String
      origin: String
    ): [Character]

    character(id: ID!): Character

    favorites(session_id: String!): [Int!]!

    isFavorite(session_id: String!, character_id: Int!): Boolean!

    comments(character_id: Int!): [Comment!]!

    deletedCharacters(session_id: String!): [DeletedCharacter!]!

    isCharacterDeleted(session_id: String!, character_id: Int!): Boolean!
  }

  type Mutation {
    toggleFavorite(session_id: String!, character_id: Int!): FavoriteResponse!

    addComment(
      session_id: String!
      character_id: Int!
      text: String!
      author_name: String
    ): Comment!

    deleteComment(id: Int!, session_id: String!): DeleteResponse!

    softDeleteCharacter(session_id: String!, character_id: Int!): DeleteResponse!

    restoreCharacter(session_id: String!, character_id: Int!): DeleteResponse!
  }
`;

export default typeDefs;
