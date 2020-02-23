import React from "react";

import { IonCard } from "@ionic/react";
import "../theme/books.css";

interface BookProps {
  books: never[];
}

const Books: React.FC<BookProps> = ({ books }) => {
  return (
    <div className="mt-3">
      {books && books.length !== 0 && (
        <>
          <h1 className="ml-2">Books</h1>
          <div className="books__container mr-2">
            {books.map((book, index) => (
              <IonCard
                key={index}
                className="book-single"
                onClick={() => console.log(book["_id"])}
              >
                <img
                  src={book["poster"]}
                  alt={book["book_name"]}
                  className="book-poster"
                />
                <span className="d-block my-2">
                  <h4 className="book-name p-0 m-0 font-family-work-sans">
                    {book["book_name"]}
                  </h4>
                  <p className="p-0 m-0 text-secondary author">
                    by {book["author"]}
                  </p>
                </span>
              </IonCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Books;
