import { gql } from "@apollo/client";

export const GET_MYSELF = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        link

        authors
        description
        title
        image
      }
    }
  }
`;
