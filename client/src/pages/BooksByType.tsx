import React, { useEffect, useState } from "react";
import { fetch } from "../utilities/httpUtils";

import { IonCard, IonSpinner } from "@ionic/react";
import { Empty } from "antd";
import "../theme/books.css";

interface TypeProps {
  type: string;
}
const BooksByType: React.FC<TypeProps> = ({ type }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`/book_type/${type}`)
      .then(res => {
        setTimeout(function() {
          setIsLoading(false);
        }, 1500);
        setBooks(res.data.booklist);
      })
      .catch(err => setIsLoading(false));
  }, []);

  return (
    <div className="mt-3">
      {isLoading ? (
        <div className="text-center mt-5">
          <IonSpinner name="lines" />
        </div>
      ) : books && books.length !== 0 ? (
        <>
          <h1 className="ml-2 text-capitalize animated slideInDown"><b>{type}s</b></h1>
          <div className="books__container mr-2">
            {books.map((book, index) => (
              <IonCard
                key={index}
                className="book-single animated zoomIn"
                routerLink={`/page/books/${book["_id"]}`}
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
                <span className="d-block book-single-hover"></span>
              </IonCard>
            ))}
          </div>
        </>
      ) : (
        <div>
          <Empty
            description={
              <span>
                Nothing found in <b className="text-danger">{type}</b> section.
              </span>
            }
          />
        </div>
      )}
    </div>
  );
};

export default BooksByType;
