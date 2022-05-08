import React from "react";
import { GET_MYSELF } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_MYSELF);

  const [removeBook] = useMutation(DELETE_BOOK);

  const userData = data?.myself || { SavedBooks: [] };

  const handleDeleteBook = async (BookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(BookId);
    if (!token) {
      return false;
    }

    try {
      const response = await removeBook({
        variables: { BookId: BookId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      removeBookId(BookId);
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
          {userData.SavedBooks.length
            ? `Viewing ${userData.SavedBooks.length} saved ${
                userData.SavedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.SavedBooks.map((book) => {
            return (
              <Card key={book.BookId} border="dark" bg="light">
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
                  <p className="small">Authors: {book.Authors}</p>
                  <Card.Text>{book.Description}</Card.Text>
                  <Card.Link href={book.link}>Google Books</Card.Link>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.BookId)}
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
