const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    title: String
    description: String
    bookId: String
    authors: [String]

    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String

    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    deleteBook(bookId: String!): User
    savedBook(input: SavedBooksInputs): User
    login(email: String!, password: String!): Auth
    addUsers(username: String!, email: String!, password: String!): Auth
  }

  input SavedBooksInputs {
    authors: [String]
    title: String
    description: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    me: User
  }
`;

module.exports = typeDefs;
