import { gql } from "@apollo/client";

export const GET_MYSELF = gql`
  {
    myself {
      _id
      email

      Username
      bookCount
      SavedBooks {
        BookId
        Authors
        title
        Description
        image
        link
      }
    }
  }
`;
