import React from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const GET_EVENT = gql`
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

const Event = (props) => {
  const { route } = useRouteNode('event');

  const { id, event } = route.params;

  if (!event) {
    console.log(event);
  }

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => { window.history.back(); }}>
            {<Icon24Back />}
          </PanelHeaderButton>
        }
      >
        {event.name}
      </PanelHeader>
      <YMaps>
        <Map defaultState={{ center: [event.location.lat, event.location.lng], zoom: 10 }} width={'100%'}>
          <Placemark geometry={[event.location.lat, event.location.lng]} />
        </Map>
      </YMaps>
      {event.location.name}
      {event.price}
      {event.description}
    </Panel>
  );
};

export default Event;
