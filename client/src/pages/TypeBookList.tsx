import React, { useEffect, useState } from "react";
import { fetch } from "../utilities/httpUtils";

import { IonCard, IonSpinner } from "@ionic/react";
import "../theme/books.css";

interface TypeProps {
  type: string;
}
const TypeBookList: React.FC<TypeProps> = ({ type }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`/book_type/${type}`).then(res => {
      setTimeout(function() {
        setIsLoading(false);
      }, 1500);
      setBooks(res.data.booklist);
    });
  }, []);

  return (
    <div className="mt-4">
      {isLoading ? (
        <div className="text-center mt-5">
          <IonSpinner name="lines" />
        </div>
      ) : (
        books &&
        books.length !== 0 && (
          <>
            <h1 className="ml-3">You may also like</h1>
            <div className="books__container mr-2">
              {books.map((book, index) => (
                <IonCard
                  key={index}
                  className="book-single"
                  onClick={() =>
                    document.location.assign(`/page/books/${book["_id"]}`)
                  }
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
        )
      )}
    </div>
  );
};

export default TypeBookList;
