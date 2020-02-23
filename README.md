## About The Project
This is an application in which people can view details such as: published date, author, a short description and publisher about the books, articles and novels. It has an admin section to maintain the contents of the application.

## Built Using
This is a hybrid application built using Ionic-React Framework along with following stacks:

- [Ionic-react](https://ionicframework.com/docs/react)
- [Capacitor](https://capacitor.ionicframework.com)
- [Node.js](https://nodejs.org/en)
- [mLab](https://mlab.com)
- [Express.js](https://expressjs.com)

[Ant Design](https://ant.design/), [moment.js](https://momentjs.com/) and [axios](https://github.com/axios/axios) were also used to built this application.

## Prerequisites
Make sure you have installed all of the following prerequisites on your computer:

- Node.js - [Download and Install Node.js](https://nodejs.org/en/).
- Node Package Manager (NPM) - [npm package manager](https://www.npmjs.com/get-npm).

You also have to register in the following sites to get an API and to run the backend. 
- mLab - We've used [mLab](https://www.mlab.com/) to store data.
- Cloudinary - We've used [cloudinary](https://cloudinary.com/) to store image file.

## App Installation

#### Backend Installation

1. Register and get a free API Key at [Cloudinary](https://cloudinary.com/).
2. Create a remote storage in mLab from [here](https://mlab.com/create/wizard#PlanType-Provider).
3. Clone the repository.

Write below command in command line to clone the repository.

```sh
git clone https://github.com/ujstha/bokholder
```

4. After cloning the repository, create .env file on backend directory and provide following credentials: 

```sh
- MLAB_URI=YOUR_MLAB_DB_URI
- CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```
After providing credentials in `.env` file, close and save the file.

5. Now run the following command in backend directory to install the packages that are in `package.json` file: 

```sh
npm install
```

6. Now run the following command in backend directory to start the backend.

```sh
npm start
```
Backend will run on port 5000. <br />
The base URL of an API will be [http://localhost:5000/api/books](http://localhost:5000/api/books). <br />
I have also deployed my backend in heroku. The API URL is [https://bokholder.herokuapp.com/api/books](https://bokholder.herokuapp.com/api/books).

#### Client Installation

7. Run the following commands in client directory to install the packages that are in package.json file:

```sh
npm install
```

8. When the installation is completed, run the following command in client directory to start the client app.

```sh
ionic serve
```

#### Build and run `client` on android device or emulator
If you want to build and run the client on your android device, run following command on client directory: <br />

```sh
ionic capacitor run android
```

#### Changes to make if backend is running on `localhost`
If you wish to use run backend locally. Then, go to following directory and open ` apiConfig.tsx ` file.
### `client/src/apiConfig.tsx`

and, replace the code on `line 2` with following code. Save and run client.

```JS
//export const BASE_URL = "https://bokholder.herokuapp.com/api/books";
export const BASE_URL = "http://localhost:5000/api/books";
```

## App Demo Link `for web view`

[https://bokholder.netlify.com/](https://bokholder.netlify.com/)
##### Note: Press ` F12 ` to view in mobile mode.


## License

Distributed under the MIT License. See `LICENSE` for more information.


