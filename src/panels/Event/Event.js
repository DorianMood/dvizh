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
import Rating from "../components/Rating";

const Event = () => {
  const { route } = useRouteNode('event');

  const { id, event: propsEvent } = route.params;
  const [event, setEvent] = useState(propsEvent);
  const [user, setUser] = useState();
  const [subscriptions, setSubscriptions] = useState({});

  const database = firebase.database();

  useEffect(() => {
    if (!propsEvent) {
      database.ref(`events/${id}`).on("value", snapshot => {
        setEvent(snapshot.val());
      });
    }
    database.ref(`subscriptions/${id}`).on("value", snapshot => {
      setSubscriptions(snapshot.val());
    });
  }, [database, id, propsEvent]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
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
    const subscribeUserData = {
      firstName: user.first_name,
      lastName: user.last_name,
      photo: user.photo_200
    };
    database.ref(`subscriptions/${id}/${user.id}`).set(subscribeUserData);
  }

  const onUnsubscribeEvent = () => {
    database.ref(`subscriptions/${id}/${user.id}`).remove();
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

      {
        <Rating eventId={id} userId={user ? user.id : 3} />
      }

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
            {
              subscriptions ?
                <UsersStack
                  photos={Object.keys(subscriptions).map(key => subscriptions[key].photo)}
                  size="m"
                  layout="vertical"
                  style={{ color: "#fff" }}
                >{Object.keys(subscriptions).length} участников</UsersStack>
                : <></>
            }
          </div>
        </Div>
        <Div style={{ display: "flex" }}>
          <Div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}><Icon24MoneyCircle style={{ margin: "-2px 10px 0 0" }} fill={"green"} /> {event.price}</Div>
          <Div style={{ flex: "1 1 auto", display: "flex", justifyContent: "center" }}><Icon24Recent style={{ margin: "-2px 10px 0 0" }} />{new Date(event.date).toLocaleString()}</Div>
        </Div>

        {
          user && event.user.vkId === user.id ? <></> :
            user && subscriptions && Object.keys(subscriptions).indexOf(`${user.id}`) !== -1 ?
              <Div>
                <Button stretched mode="outline" style={{ padding: "10px" }} onClick={onUnsubscribeEvent}>Не пойду</Button>
              </Div>
              :
              <Div>
                <Button stretched mode="commerce" style={{ padding: "10px" }} onClick={onSubscribeEvent}>Пойду</Button>
              </Div>
        }
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
