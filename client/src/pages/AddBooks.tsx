import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonIcon
} from "@ionic/react";
import { bookTypes } from "../bookTypes";
import { genres } from "../genres";
import { store } from "../utilities/httpUtils";
import { cloudUpload } from "ionicons/icons";
import "../theme/add-books.css";

const AddBooks: React.FC = () => {
  const [book_name, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [released, setReleased] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [posterName, setPosterName] = useState("");
  const [posterType, setPosterType] = useState("");
  const [response, setResponse] = useState("");
  const [resColor, setResColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    setPoster(file);
    if (file) {
      setPosterName(file.name);
      setPosterType(file.type);
    }
  };

  function addBooks() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("book_name", book_name);
    formData.append("author", author);
    formData.append("released", released);
    formData.append("publisher", publisher);
    formData.append("isbn", isbn);
    formData.append("type", type);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("poster", poster);

    return store("", formData).then(res => {
      setIsLoading(false);
      setResColor("success");
      setResponse(`${res.data.msg}`);
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add Books</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-8 col-lg-8 col-xl-6 card card-header my-2">
            <IonLoading
              isOpen={isLoading}
              onDidDismiss={() => setIsLoading(false)}
              message={"Saving Data...."}
              duration={5000}
            />
            {response && (
              <div className={`alert alert-${resColor} text-center`}>
                {response}
              </div>
            )}
            <Form
              className="mx-1 my-1"
              onSubmit={e => {
                e.preventDefault();
                addBooks();
              }}
              encType="multipart/form-data"
            >
              <Form.Item label="Book Name" className="m-0">
                <Input
                  size="large"
                  placeholder="Type the name of book...."
                  onChange={e => setBookName(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Author" className="m-0">
                <Input
                  size="large"
                  placeholder="Type book's author...."
                  onChange={e => setAuthor(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Publisher" className="m-0">
                <Input
                  size="large"
                  placeholder="Type book's publisher...."
                  onChange={e => setPublisher(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="ISBN-13" className="m-0">
                <Input
                  size="large"
                  placeholder="Type book's ISBN-13...."
                  onChange={e => setIsbn(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Released" className="m-0">
                <DatePicker
                  size="large"
                  placeholder="Type released date...."
                  onChange={(date, dateString) => setReleased(dateString)}
                />
              </Form.Item>
              <Form.Item label="Type of book" className="m-0">
                <Select
                  size="large"
                  placeholder="Select the type of book...."
                  onChange={(value: string) => setType(value)}
                >
                  {bookTypes.map((type, index) => (
                    <Select.Option value={type} key={index}>
                      {type}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Genre of book" className="m-0">
                <Select
                  size="large"
                  mode="multiple"
                  placeholder="Select the genre of book...."
                  onChange={(value: string) => setGenre(value)}
                  showArrow={true}
                  showSearch={true}
                >
                  {genres.map((genre, index) => (
                    <Select.Option value={genre} key={index}>
                      {genre}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Description of book" className="m-0">
                <Input.TextArea
                  rows={5}
                  placeholder="Type a description for the book...."
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Upload Image">
                <label
                  htmlFor="file-upload"
                  className="file-upload-button mb-0"
                >
                  <div className="file-name">
                    <IonIcon icon={cloudUpload} />
                    &ensp;
                    {posterName ? posterName : "Upload an Image...."}
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageChange(e)}
                />
                <span className="d-block text-info">
                  Note: only .jpg, .jpeg and png formats are allowed.
                </span>
                {poster &&
                  posterType !== "" &&
                  posterType !== "image/jpeg" &&
                  posterType !== "image/jpg" &&
                  posterType !== "image/png" && (
                    <span className="d-block text-danger">
                      Please upload image with .jpg, .jpeg or png format.
                    </span>
                  )}
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  block
                  type="primary"
                  loading={isLoading}
                  disabled={
                    book_name === "" ||
                    author === "" ||
                    publisher === "" ||
                    type === "" ||
                    genre === "" ||
                    isbn === "" ||
                    released === ""
                      ? true
                      : false
                  }
                >
                  <i className="fa fa-save"></i> &ensp;Save this Book
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddBooks;
