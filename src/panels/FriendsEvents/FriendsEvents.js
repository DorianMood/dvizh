import React, { useState, useEffect } from "react";
import { Panel, Spinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import EventCardList from "../Event/EventCardList";

const GET_EVENTS = gql`
  {
    Events(id: "123") {
      id
      name
      description
      price
      location {
        lat
        lng
        name
      }
    }
  }
`;

const FriendsEvents = (props) => {
  // Fetch data
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const friends = await bridge.send("VKWebAppGetFriends");
      setFriends(friends);
    }
    fetchData();
  }, []);

  // Display loading animation
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Spinner size="large" style={{  }} />
      </div>
    );
  if (error) return `Error: ${error.message}`;

  return (
    <Panel>
      <EventCardList events={data.Events} />
    </Panel>
  );
};

export default FriendsEvents;
