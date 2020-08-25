import React, { useEffect, useState } from "react";
import { useRouteNode } from "react-router5";
import { PanelHeaderButton, Panel, PanelHeader, Spinner, Div, Cell, Button, Group, Header, UsersStack, PanelHeaderContent } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import { YMaps, Map, Placemark } from "react-yandex-maps";
import firebase from "firebase";
import "firebase/storage";
import bridge from "@vkontakte/vk-bridge";
import UserSmallCard from "../components/UserSmallCard";
import Rating from "../components/Rating";
import QRCode from "qrcode";

const Event = () => {
  const { route } = useRouteNode('event');

  const { id, event: propsEvent } = route.params;
  const [event, setEvent] = useState(propsEvent);
  const [user, setUser] = useState({ id: "dorianmood" });
  const [subscriptions, setSubscriptions] = useState({});
  const [picture, setPicture] = useState("");
  const [qrCode, setQrCode] = useState("");

  const database = firebase.database();
  const storage = firebase.storage();

  useEffect(() => {
    if (!propsEvent) {
      database.ref(`events/${id}`).on("value", snapshot => {
        setEvent(snapshot.val());
      });
    }
    database.ref(`subscriptions/${id}`).on("value", snapshot => {
      setSubscriptions(snapshot.val());
    });
    storage.ref(`events_pictures/${id}`).getDownloadURL().then(url => {
      setPicture(url);
    }).catch(() => {
      // This event has no picture  
    });
  }, [database, id, propsEvent]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    QRCode.toString(id, (e, data) => {
      setQrCode(data);
    });
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

  const ratingFragment = new Date(event.date) < new Date() ?
    <Rating eventId={id} userId={user.id} /> :
    <Div>Не забудте поставить рейтинг после окончания события <span role="img" aria-label="down">😊</span></Div>;

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => { window.history.back(); }}>
            <Icon24Back />
          </PanelHeaderButton>
        }
      >
        <PanelHeaderContent>{event.name}</PanelHeaderContent>
      </PanelHeader>

      { ratingFragment }

      <Div style={{ height: "240px", padding: 0 }}>
        <YMaps>
          <Map defaultState={{ center: [event.location.lat, event.location.lng], zoom: 10 }} width={'100%'}>
            <Placemark geometry={[event.location.lat, event.location.lng]} options={{ preset: "islands#geolocationIcon" }} />
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${picture})`,
            backgroundSize: "cover",
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

        <h3 style={{ textAlign: "center", margin: "10px 0 0 0" }}><span role="img" aria-label="down">👇🏻</span> Сканируй событие тут! <span role="img" aria-label="down">👇🏻</span></h3>
        <Div id="event-qr-code" dangerouslySetInnerHTML={{ __html: qrCode }}></Div>

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
