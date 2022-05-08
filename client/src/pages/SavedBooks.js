import React from "react";
import { removeBookId } from "../utils/localStorage";
import { GET_MYSELF } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";

const SavedBooks = () => {
  const [deleteBook] = useMutation(DELETE_BOOK);

  const { loading, data } = useQuery(GET_MYSELF);
  const userData = data?.me || { savedBooks: [] };

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(bookId);
    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook({
        variables: { bookId: bookId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-warning">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark" bg="light">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                    style={{ width: "9.69em" }}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Link href={book.link}>Google Books</Card.Link>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
