import React, { useEffect, useState } from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader, Spinner, Div, Cell, Avatar, Button} from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24User from "@vkontakte/icons/dist/28/user";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const Event = (props) => {
  const { route } = useRouteNode('event');

  const { id, event } = route.params;

  const [mapMount, setMapMount] = useState(false);

  useEffect(() => {
    setMapMount(true);
  }, [mapMount]);

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
      <Div style={{ height: "240px", padding: 0 }}>
        <YMaps>
          <Map defaultState={{ center: [event.location.lng, event.location.lat], zoom: 10 }} width={'100%'}>
            <Placemark geometry={[event.location.lng, event.location.lat]} options={{ preset: "islands#geolocationIcon" }} />
          </Map>
        </YMaps>
      </Div>

      <Cell
        before={
          <Avatar size={64}>
            <Icon24User />
          </Avatar>
        }
        size="l"
        description={
          <div style={{ display: "flex" }}>
            <Icon16Place />
            {event.location.name}
          </div>
        }
        asideContent={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Icon24MoneyCircle />
            <div style={{ display: "flex" }}>{Math.round(event.price)}</div>
            <div style={{ display: "flex" }}>
              <Button size="m" onClick={(e) => { e.stopPropagation(); console.log('click will participate') }}>Пойду</Button>
            </div>
          </div>
        }
        bottomContent={
            event.description
        }
      >
        {event.name}
      </Cell>
    </Panel>
  );
};

export default Event;
