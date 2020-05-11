import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Meta from "./panels/Meta";
import TabsRoot from "./panels/TabsRoot";

const client = new ApolloClient({
  uri: "https://dvizh-api.herokuapp.com/",
});

const App = () => {
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
