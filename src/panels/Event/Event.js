import React, { useEffect, useState } from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader, Spinner, Div, Cell, Avatar, Button, Group, Header, Card, CardGrid, UsersStack } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24User from "@vkontakte/icons/dist/28/user";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import firebase from "firebase";
import "@react-firebase/database";


const Event = (props) => {
  const { route } = useRouteNode('event');

  const { id, event: propsEvent } = route.params;
  const [event, setEvent] = useState(propsEvent);

  const database = firebase.database();

  useEffect(() => {
    if (!propsEvent) {
      database.ref(`events/${id}`).on("value", (snapshot) => {
        setEvent(snapshot.val());
      });
    }
  }, []);

  if (!event) {
    return <Spinner size="large" />
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
        <h5>{event.name}</h5>
      </PanelHeader>
      <Div style={{ height: "240px", padding: 0 }}>
        <YMaps>
          <Map defaultState={{ center: [event.location.lng, event.location.lat], zoom: 10 }} width={'100%'}>
            <Placemark geometry={[event.location.lng, event.location.lat]} options={{ preset: "islands#geolocationIcon" }} />
          </Map>
        </YMaps>
      </Div>

      <Group header={<Header mode="secondary">Описание</Header>}>
        <Cell multiline size="l">
          {event.description}
        </Cell>
      </Group>

      <Group header={<Header mode="secondary">Информация</Header>}>
        <CardGrid>
          <Card size="l">
            <UsersStack
              photos={[
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1",
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1",
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1"
              ]}
              size="m"
              layout="vertical"
            >1337 участников</UsersStack>
          </Card>
          <Card size="s">
            <Cell asideContent={Math.round(event.price)}>
              <Icon24MoneyCircle fill={"#3f8ae0"} />
            </Cell>
          </Card>
        </CardGrid>
        <CardGrid>
          <Card size="l">
            <Div style={{display: "flex"}}>
              <Button stretched style={{margin: "10px"}}>Пойду</Button>
              <Button stretched mode="commerce" style={{margin: "10px"}}>Проголосовать</Button>
            </Div>
          </Card>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Event;
