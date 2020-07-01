import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import dotenv from "dotenv";

import Meta from "./components/Meta";
import TabsRoot from "./Main/TabsRoot";

const client = new ApolloClient({
  uri: "https://dvizh-api.herokuapp.com/",
});

dotenv.config();

const App = (props) => {
  return (
    <>
      <Meta />

      <ApolloProvider client={client}>
        <TabsRoot />
      </ApolloProvider>
    </>
  );
};

export default App;
