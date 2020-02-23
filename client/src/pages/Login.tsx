import React, { useState } from "react";
import { Form, Input, Button } from "antd";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

const Login: React.FC = () => {
  const user = "admin";
  const pass = "password";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function login() {
    setIsLoading(true);
    if (user === username && pass === password) {
      window.localStorage.setItem("loggedIn", "true");
      setIsLoading(false);
      document.location.href = "/page/add-books";
    } else if (user !== username || pass !== password) {
      window.localStorage.setItem("loggedIn", "false");
      setIsLoading(false);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-4 card card-header">
            <Form
              className="m-3"
              onSubmit={e => {
                e.preventDefault();
                login();
              }}
            >
              <Form.Item label="Username" className="p-0 m-0">
                <Input
                  size="large"
                  placeholder="Type your username...."
                  onChange={e => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Password">
                <Input
                  size="large"
                  placeholder="Type your password...."
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  block
                  size="large"
                  icon="login"
                  type="ghost"
                  loading={isLoading}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
