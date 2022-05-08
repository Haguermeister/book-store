const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    BookId: String
    Authors: [String]
    title: String
    Description: String
    image: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type User {
    _id: ID
    Username: String
    email: String
    bookCount: Int
    SavedBooks: [Book]
  }

  input SavedBookInput {
    Authors: [String]
    title: String
    Description: String
    BookId: String
    image: String
    link: String
  }

  type Query {
    myself: User
  }

  type Mutation {
    AddUser(Username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    DeleteBooks(BookId: String!): User
    SavedBook(input: SavedBookInput): User
  }
`;

module.exports = typeDefs;
