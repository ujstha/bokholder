import React from "react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/books.css";
import BooksByType from "./BooksByType";
import { genres } from "../genres";
import BooksByGenre from "./BooksByGenre";
import { bookTypes } from "../bookTypes";
import SearchBox from "./SearchBox";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SearchBox />
        {bookTypes.map((type, index) => (
          <BooksByType type={type} key={index} />
        ))}

        {genres.map((genre, index) => (
          <BooksByGenre genre={genre} key={index} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
