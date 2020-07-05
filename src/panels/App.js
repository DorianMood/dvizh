import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import dotenv from "dotenv";

import Meta from "./components/Meta";
import TabsRoot from "./Main/TabsRoot";
import EventAdd from "./components/EventAdd";

dotenv.config();

const App = () => {
  return (
    <>
      <Meta />

      <TabsRoot />
    </>
  );
};

export default App;
