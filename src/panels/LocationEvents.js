import React, { useState, useEffect } from "react";
import { Panel, Spinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { YMaps, Map } from 'react-yandex-maps';

import EventCardList from "./EventCardList";

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

const LocationEvents = (props) => {
  // Fetch data
  const { loading, error, data } = useQuery(GET_EVENTS);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setLocation(location);
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
          flexDirection: "column",
        }}
      >
        <Spinner size="large" style={{ marginTop: 20 }} />
      </div>
    );
  if (error) return `Error: ${error.message}`;

  return (
    <Panel>
      <YMaps>
        <Map defaultState={{ center: [56.85, 60.6], zoom: 10 }} width={'100%'} />
      </YMaps>
      <EventCardList events={data.Events} />
    </Panel>
  );
};

export default LocationEvents;
