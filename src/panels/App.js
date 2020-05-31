import React from "react";
import "@vkontakte/vkui/dist/vkui.css";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Meta from "./components/Meta";
import TabsRoot from "./Main/TabsRoot";

const client = new ApolloClient({
  uri: "https://dvizh-api.herokuapp.com/",
});

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
