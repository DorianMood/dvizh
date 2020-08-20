import "core-js/features/map";
import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import { RouterProvider } from "react-router5";

import bridge from "@vkontakte/vk-bridge";

import firebase from "firebase/app";
import "firebase/auth";

import { v4 as uuidv4 } from "uuid";

import App from "./panels/App";
import configureRouter from "./create-router";
import AuthProvider from "./auth/AuthProvider";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const router = configureRouter();

// Firebase Config
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_URL
};
firebase.initializeApp(config);

// TODO : secure api keys

const logIn = async () => {
  const storage = await bridge.send("VKWebAppStorageGet", {
    keys: [
      "userUuid"
    ]
  });
  const user = await bridge.send("VKWebAppGetUserInfo");

  let email = user.id;
  let password = storage.keys[0].value;

  // For new users generate and
  // save unique userId here
  if (!password) {
    const userUuid = uuidv4();
    password = userUuid;
    await bridge
      .send("VKWebAppStorageSet", { key: "userUuid", value: userUuid })
      .catch(e => console.log(e));
  }

  let fauth = firebase.auth();

  fauth.createUserWithEmailAndPassword(`${email}@vk.com`, password).then((e) => {
    console.log("create user : OK");
  }).catch((e) => {
    console.error(e.code);
  }).then(() => {
    fauth.signInWithEmailAndPassword(`${email}@vk.com`, password).then((e) => {
      console.log("login : OK");
    }).catch((e) => {
      console.log(e.code);
    })
  });
}

logIn();

router.start(() => {
  ReactDOM.render(
    <AuthProvider>
      <RouterProvider router={router}>
        <App router={router} />
      </RouterProvider>
    </AuthProvider>
    ,
    document.getElementById("root")
  );
});

//if (process.env.NODE_ENV === "development") {
import("./eruda").then((eruda) => { }); //runtime download
//}
