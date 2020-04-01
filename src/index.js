import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import connect from "@vkontakte/vkui-connect";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");

// connect.send('VKWebInit', {});

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(eruda => {}); //runtime download
}
