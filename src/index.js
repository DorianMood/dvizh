import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router5";
import { Provider } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import App from "./panels/App";
import createStore from "./store/reducers";
import configureRouter from "./create-router";

// Init VK  Mini App
bridge.send("VKWebAppInit");

const router = configureRouter();
const store = createStore(router);


router.start(() => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router}>
        <App router={router} />
      </RouterProvider>
    </Provider>,
    document.getElementById("root")
  );
});

if (process.env.NODE_ENV === "development") {
  import("./eruda").then((eruda) => { }); //runtime download
}
