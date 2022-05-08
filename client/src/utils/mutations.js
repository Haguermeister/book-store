import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        _id

        email
      }
    }
  }
`;

export const ADD_USERS = gql`
  mutation addUsers($username: String!, $email: String!, $password: String!) {
    addUsers(username: $username, email: $email, password: $password) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVED_BOOK = gql`
  mutation savedBook($input: SavedBooksInputs!) {
    savedBook(input: $input) {
      username
      _id
      bookCount
      savedBooks {
        link

        bookId
        image
        authors
        description
        title
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      bookCount
      savedBooks {
        bookId
        image
        link
        authors
        description
        title
      }
    }
  }
`;
