import React, { useEffect, useState } from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader, Spinner, Div, Cell, Avatar, Button, Group, Header, Card, CardGrid, UsersStack } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24User from "@vkontakte/icons/dist/28/user";
import Icon28QrCodeOutline from '@vkontakte/icons/dist/28/qr_code_outline';
import Icon56CheckCircleOutline from '@vkontakte/icons/dist/56/check_circle_outline';
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
        <Div>
          <div style={{
            backgroundImage: "url(https://api.parkseason.ru/images/styles/1200_500/d2/af/30e62fddc14c05988b44e7c02788e18759dce9c49e9cc281915310.jpg)",
            backgroundImage: "url(https://api.parkseason.ru/images/styles/1200_500/d2/af/30e62fddc14c05988b44e7c02788e18759dce9c49e9cc281915310.jpg), linear-gradient(90deg, #fff 0%, #000 100%)",
            height: "200px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "6px",
            borderRadius: 12
          }}>
            <UsersStack
              photos={[
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1",
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1",
                "https://sun9-12.userapi.com/c851016/v851016587/119cab/ai0uN_RKSXc.jpg?ava=1"
              ]}
              size="m"
              layout="vertical"
              style={{ color: "#fff" }}
            >1337 участников</UsersStack>
          </div>
        </Div>
        <Cell asideContent={Math.round(event.price)}>
          <Icon24MoneyCircle fill={"#3f8ae0"} />
        </Cell>
        <Div style={{ display: "flex" }}>
          <Icon56CheckCircleOutline />
          <Button stretched style={{ margin: "10px" }}>Пойду</Button>
          
        </Div>
        <Icon28QrCodeOutline />
      </Group>
    </Panel>
  );
};

export default Event;
