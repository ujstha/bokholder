import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote
} from "@ionic/react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  bookSharp,
  bookOutline,
  logInOutline,
  logInSharp,
  addCircleOutline,
  addCircleSharp,
  logOutOutline,
  arrowForwardCircleOutline
} from "ionicons/icons";
import "./Menu.css";
import { genres } from "../genres";

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/page/books",
    iosIcon: bookOutline,
    mdIcon: bookSharp
  },
  localStorage.loggedIn === "true"
    ? {
        title: "Add Books",
        url: "/page/add-books",
        iosIcon: addCircleOutline,
        mdIcon: addCircleSharp
      }
    : {
        title: "Login",
        url: "/page/login",
        iosIcon: logInOutline,
        mdIcon: logInSharp
      }
];

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="bokholder-list">
          <IonListHeader>Bokholder</IonListHeader>
          <IonNote>bokholder@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  routerLink={appPage.url}
                  className={selectedPage === appPage.url ? "selected" : ""}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          {localStorage.loggedIn && localStorage.loggedIn === "true" && (
            <IonMenuToggle autoHide={false}>
              <IonItem
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                }}
                routerLink="/"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel color="danger">LogOut</IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}
        </IonList>

        <IonList id="genres-list">
          <IonListHeader>Genres</IonListHeader>
          {genres.map((genre, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                lines="none"
                key={index}
                className={
                  selectedPage === `/page/books/genre/${genre}`
                    ? "selected"
                    : ""
                }
                routerDirection="none"
                href={`/page/books/genre/${genre}`}
              >
                <IonIcon slot="start" icon={arrowForwardCircleOutline} />
                <IonLabel className="text-capitalize">{genre}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
