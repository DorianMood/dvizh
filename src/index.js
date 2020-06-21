import "core-js/features/map";
import "core-js/features/set";

import React from "react";
import ReactDOM from "react-dom";

import { RouterProvider } from "react-router5";

import bridge from "@vkontakte/vk-bridge";

import firebase from "firebase/app";
import "firebase/database";

import App from "./panels/App";
import configureRouter from "./create-router";

// Init VK  Mini App
bridge.send("VKWebAppInit");
const VK_ID = "secret-vk-id";

const router = configureRouter();

// Firebase Config
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN
};
firebase.initializeApp(config);
var database = firebase.database();
database.ref("events/").on("value", (dataSnapshot) => {
  console.log(dataSnapshot.val());
});

router.start(() => {
  ReactDOM.render(
    <RouterProvider router={router}>
      <App router={router} />
    </RouterProvider>,
    document.getElementById("root")
  );
});

if (process.env.NODE_ENV === "development") {
  import("./eruda").then((eruda) => { }); //runtime download
}
