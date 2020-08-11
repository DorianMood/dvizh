import React, { useEffect, useState } from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader, Spinner, Div, Cell, Button, Group, Header, UsersStack } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon28QrCodeOutline from '@vkontakte/icons/dist/28/qr_code_outline';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import firebase from "firebase";
import bridge from "@vkontakte/vk-bridge";
import UserSmallCard from "../components/UserSmallCard";

const Event = () => {
  const { route } = useRouteNode('event');

  const { id, event: propsEvent } = route.params;
  const [event, setEvent] = useState(propsEvent);
  const [user, setUser] = useState();

  const database = firebase.database();

  useEffect(() => {
    if (!propsEvent) {
      database.ref(`events/${id}`).on("value", (snapshot) => {
        setEvent(snapshot.val());
      });
    }
  }, [database, id, propsEvent]);

  useEffect(() => {
    const fetchData = async () => {
      const user = bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      
    }
    fetchData();
  }, []);

  if (!event) {
    return <Spinner size="large" />
  }

  const onDeleteEvent = () => {
    database.ref(`events/${id}`).remove().then(() => {
      console.log("Event removed");
      database.ref(`subscriptions/${id}`).remove().then(() => {
        console.log("Subscriptions removed");
        window.history.back();
      });
    });
  }

  const onSubscribeEvent = () => {
    console.log(user);
    // TODO : implement
    console.log("SUBSCRIBE", {
      id: id,
      user: {
        vkId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        photo: user.photo_200
      }
    });
  }

  console.log(user);

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => { window.history.back(); }}>
            <Icon24Back />
          </PanelHeaderButton>
        }
        right={
          <PanelHeaderButton onClick={() => { /* TODO : show QR here. */ }}>
            <Icon28QrCodeOutline />
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

      <UserSmallCard user={event.user} />

      <Group header={<Header mode="secondary">Информация</Header>}>
        <Div>
          <div style={{
            backgroundImage: "url(https://api.parkseason.ru/images/styles/1200_500/d2/af/30e62fddc14c05988b44e7c02788e18759dce9c49e9cc281915310.jpg)",
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
        <Div style={{ display: "flex" }}>
          <Div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}><Icon24MoneyCircle style={{ margin: "-2px 10px 0 0" }} fill={"green"} /> {event.price}</Div>
          <Div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}><Icon24Recent style={{ margin: "-2px 10px 0 0" }} />{new Date(event.date).toLocaleString()}</Div>
        </Div>

        <Div>
          <Button stretched mode="commerce" style={{ padding: "10px" }} onClick={onSubscribeEvent}>Пойду</Button>
        </Div>
        { // TODO : give permission to delete only to owners.
          user && user.id === event.user.vkId ?
            <Div>
              <Button stretched mode="destructive" style={{ padding: "10px" }} onClick={onDeleteEvent}>Удалить</Button>
            </Div> : <></>
        }
      </Group>
    </Panel>
  );
};

export default Event;