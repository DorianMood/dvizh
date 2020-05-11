import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import createRouter from "./create-router";
import { RouterProvider } from "react-router5";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const router = createRouter();

router.start(() => {
  ReactDOM.render(
    <RouterProvider router={router}>
      <App router={router} />
    </RouterProvider>,
    document.getElementById("root")
  );
});

if (process.env.NODE_ENV === "development") {
  import("./eruda").then((eruda) => {}); //runtime download
}
