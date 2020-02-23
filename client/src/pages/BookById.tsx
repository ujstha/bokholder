import React, { useEffect, useState } from "react";
import { fetch, destroy } from "../utilities/httpUtils";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonActionSheet,
  IonToast
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import "../theme/book-id.css";
import { Tag, Button } from "antd";
import TypeBookList from "./TypeBookList";
import {
  arrowBack,
  trashBin,
  close,
  pencil,
  pencilOutline,
  trashSharp,
  trash
} from "ionicons/icons";
import SearchBox from "./SearchBox";
import moment from "moment";

const BookById: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [book, setBook] = useState(Object);
  const [genres, setGenres] = useState([]);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch(`/${match.params.id}`).then(res => {
      setBook(res.data);
      setGenres(res.data.genre.split(","));
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerDirection="back"
              onClick={() => window.history.back()}
              size="large"
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{book.book_name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SearchBox />
        <div className="book_by_id">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
              <div className="rounded-0 border-0 mt-1">
                <div className="d-flex justify-content-center poster-container">
                  <div
                    style={{
                      backgroundImage: `url(${book.poster})`
                    }}
                    className="poster-underlay"
                  ></div>
                  <img
                    src={book.poster}
                    alt={book.book_name}
                    className="book-poster shadow"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8 book-details mt-3 px-4">
              <h1
                className="font-family-vollkorn-sc"
                style={{ fontSize: 35 }}
              >
                {book.book_name} <small style={{fontSize: 22}}>({book.type})</small>
                <span className="book-author my-2"><b>Author : </b> {book.author}</span>
                <span className="book-publisher my-2"><b>Publisher : </b> {book.publisher}</span>
                <span className="book-released my-2"><b>Released on : </b> {moment(book.released).format("Do MMM, YYYY")}</span>
                <span className="book-isbn my-2"><b>ISBN-13 : </b> {book.isbn}</span>
                <span>
                  {genres.map((genre: string, index) => (
                    <Tag
                      key={index}
                      className="animated zoomIn text-capitalize"
                      onClick={() =>
                        document.location.assign(`/page/books/genre/${genre}`)
                      }
                    >
                      {genre}
                    </Tag>
                  ))}
                </span>
              </h1>
              <span className="book-description">{book.description}</span>
              {localStorage.loggedIn === "true" && (
                <div>
                  <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    buttons={[
                      {
                        text: "Edit",
                        cssClass: "text-primary",
                        icon: pencil,
                        handler: () => {
                          document.location.href = `/page/edit-books/${book._id}`;
                        }
                      },
                      {
                        text: "Delete",
                        role: "destructive",
                        cssClass: "text-danger",
                        icon: trash,
                        handler: () => {
                          destroy(book._id).then(res => {
                            console.log("Delete Successful.");
                            setShowToast(true);
                          });
                        }
                      },
                      {
                        text: "Cancel",
                        icon: close,
                        role: "cancel",
                        handler: () => {
                          setShowActionSheet(true);
                        }
                      }
                    ]}
                  ></IonActionSheet>
                  <IonToast
                    isOpen={showToast}
                    duration={400}
                    message="Delete Successful."
                    onDidDismiss={() => {
                      setShowToast(false);
                      document.location.href = "/";
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={() => setShowActionSheet(true)}
                    className="mt-3"
                  >
                    Manage this {book.type}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {book && book.type && <div className="type-book-list"><TypeBookList type={book.type} /></div>}
      </IonContent>
    </IonPage>
  );
};

export default BookById;
