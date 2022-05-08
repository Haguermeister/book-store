import { gql } from "@apollo/client";

export const ADDS_USER = gql`
  mutation AddUser($Username: String!, $email: String!, $password: String!) {
    AddUser(Username: $Username, email: $email, password: $password) {
      token
      user {
        _id
        Username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id

        Username
        email
      }
    }
  }
`;

export const SAVED_BOOK = gql`
  mutation SavedBook($input: SavedBookInput!) {
    SavedBook(input: $input) {
      Username
      bookCount
      _id
      SavedBooks {
        Authors
        image
        link
        BookId
        title
        Description
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBooks($BookId: String!) {
    DeleteBooks(BookId: $BookId) {
      _id
      bookCount
      Username
      SavedBooks {
        Authors
        image
        link
        BookId
        title
        Description
      }
    }
  }
`;
