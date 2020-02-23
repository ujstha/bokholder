import React, { useEffect, useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonButton,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner
} from "@ionic/react";
import "../theme/books.css";
import { RouteComponentProps } from "react-router";
import { fetch } from "../utilities/httpUtils";
import { Button, Empty } from "antd";
import { arrowBack } from "ionicons/icons";
import SearchBox from "./SearchBox";

const SearchList: React.FC<RouteComponentProps<{
  name: string;
  search_params: string;
}>> = ({ match }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`/search/${match.params.search_params}/${match.params.name}`)
      .then(res => {
        setIsLoading(false);
        setBooks(res.data.booklist);
      })
      .catch(err => setIsLoading(false));
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              routerDirection="back"
              onClick={() => window.history.back()}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Search Results</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="mt-3 container-fluid gbl">
          <SearchBox />
          {isLoading ? (
            <div className="text-center mt-5">
              <IonSpinner name="lines" />
            </div>
          ) : books && books.length !== 0 ? (
            <>
              <h1 className="ml-2">
                Search results for <b>{match.params.name}</b>
              </h1>
              <div className="row mb-2">
                {books.map((book, index) => (
                  <div className="col-md-6 mt-3 animated zoomIn" key={index}>
                    <div
                      className="media p-2"
                      style={{ border: "1px solid #d9d9d9" }}
                    >
                      <img
                        src={book["poster"]}
                        className="mr-3 gbl-poster"
                        alt={book["book_name"]}
                      />
                      <div className="media-body">
                        <h1 className="mt-3 font-weight-bold">
                          {book["book_name"]}
                        </h1>
                        <h5>
                          <span>
                            {book["author"]} <small>(author)</small>
                          </span>
                          <span className="mt-2">
                            {book["publisher"]} <small>(publisher)</small>
                          </span>
                        </h5>
                        <Button
                          type="primary"
                          onClick={() =>
                            document.location.assign(
                              `/page/books/${book["_id"]}`
                            )
                          }
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-box">
              <Empty
                description={
                  <span>
                    Your search for{" "}
                    <span className="text-danger">{match.params.name}</span> did
                    not have any matches
                    <span className="mt-1 text-left">
                      <span className="d-block">Suggestions:</span>
                      <span className="d-block pl-3" style={{ fontSize: 12 }}>
                        <span className="d-block">Try different keywords</span>
                        <span className="d-block">
                          Try searching with different category
                        </span>
                      </span>
                    </span>
                  </span>
                }
              />
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SearchList;
