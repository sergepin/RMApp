import  { gql }  from 'graphql-tag'

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

    type Query {
    characters: [Character]
    character(id: ID!): Character
    }
`

export default typeDefs