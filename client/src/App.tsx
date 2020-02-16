import Menu from "./components/Menu";
import React, { useState } from "react";
import { IonApp, IonRouterOutlet, setupConfig } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./theme/index.css";
import AddBooks from "./pages/AddBooks";
import EditBooks from "./pages/EditBooks";

setupConfig({
  animated: true,
  swipeBackEnabled: true
});

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState("");

  return (
    <IonApp>
      <IonReactRouter>
        <Menu selectedPage={selectedPage} />
        <IonRouterOutlet id="main">
          <Route
            path="/page/add-books"
            render={props => {
              setSelectedPage(props.match.path);
              return <AddBooks />;
            }}
            exact={true}
          />
          <Route
            path="/page/edit-books/:id"
            render={props => {
              return <EditBooks {...props} />;
            }}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
