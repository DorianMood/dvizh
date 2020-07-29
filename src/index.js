import "core-js/features/map";
import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import { RouterProvider } from "react-router5";

import bridge from "@vkontakte/vk-bridge";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

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
  authDomain: process.env.REACT_APP_AUTH_DOMAIN
};
firebase.initializeApp(config);

// TODO: login or signup user here.

let fauth = firebase.auth();

fauth.createUserWithEmailAndPassword("dorianmood@163.com", "hello123").then((e) => {
  console.log("create user : OK");
}).catch((e) => {
  console.error(e.code);
}).then(() => {
  fauth.signInWithEmailAndPassword("dorianmood@163.com", "hello123").then((e) => {
    console.log("login : OK");
  }).catch((e) => {
    console.log(e.code);
  })
});


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

if (process.env.NODE_ENV === "development") {
  import("./eruda").then((eruda) => { }); //runtime download
}
