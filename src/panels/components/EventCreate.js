import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Div,
  Input,
  Button,
  FormLayout,
  FormLayoutGroup,
  Textarea,
  File
} from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import { YMaps, Placemark, Map } from "react-yandex-maps";
import bridge from "@vkontakte/vk-bridge";
import firebase from "firebase/app";
import { AuthContext } from "../../auth/AuthProvider";

const EventCreate = () => {

  const firebaseUser = useContext(AuthContext);

  console.log(firebaseUser);

  let userIds = {
    firebaseId: firebaseUser.uid,
    vkId: ""
  };

  const database = firebase.database();

  // form refs to get rid of rerendering
  const eventName = useRef();
  const eventPrice = useRef();
  const eventPicture = useRef();
  const eventDescription = useRef();

  const [location, setLocation] = useState({
    name: "Место",
    coordinates: [56.83890, 60.605192]
  });
  const [userLocation, setUserLocation] = useState([56.83890, 60.605192]);
  const [event, setEvent] = useState({
    name: "Event name",
    description: "",
    price: 0,
    location: {
      name: location.name,
      lng: location.coordinates[0],
      lat: location.coordinates[1]
    },
    date: Date.now(),
    user: userIds // TODO : set vk user id
  });

  useEffect(() => {
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setUserLocation([location.lat, location.long]);
      const user = await bridge.send("VKWebAppGetUserInfo");
      userIds.vkId = user.id;
    }
    fetchData();
  }, []);

  useEffect(() => {
    let GEOCODER_URL =
      `https://geocode-maps.yandex.ru/1.x/?apikey=${
      process.env.REACT_APP_YANDEX_KEY
      }&geocode=${
      [location.coordinates[1], location.coordinates[0]].join(',')
      }&format=json`;

    fetch(GEOCODER_URL).then(response => response.json()).then(data => {
      setLocation({
        ...location,
        name: data.response.GeoObjectCollection.featureMember[0].GeoObject.name
      });
    });
  }, [location.coordinates])

  const submitEvent = async () => {
    database.ref(`events`).push(
      {
        ...event,
        name: eventName.current.value,
        price: eventPrice.current.value,
        description: eventDescription.current.value,
        location: {
          name: location.name,
          lng: location.coordinates[0],
          lat: location.coordinates[1]
        },
        user: userIds
      }
    );
  }

  const onSubmit = () => {    
    submitEvent().then(() => {
      window.history.back();
    });
  }

  return (
    <Panel>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => { window.history.back(); }}>
            {<Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Опишите событие
      </PanelHeader>


      <FormLayout>
        <FormLayoutGroup top={location.name}>
          <Div style={{ height: "150px" }}>
            <YMaps>
              <Map
                defaultState={{ center: location.coordinates, zoom: 10 }}
                height={'150px'} width={'100%'}
                onClick={(e) => { setLocation({ ...location, coordinates: e.get('coords') }) }}
              >
                <Placemark geometry={userLocation} options={{ preset: "islands#redCircleDotIcon" }} />
                <Placemark geometry={location.coordinates} />
              </Map>
            </YMaps>
          </Div>
        </FormLayoutGroup>

        <Input top="Название" getRef={eventName} />
        <File top="Загрузите фото" getRef={eventPicture} before={<Icon24Camera />} controlSize="l">
          Открыть галерею
        </File>
        <Input top="Цена" getRef={eventPrice} type="number" defaultValue={0} />
        <Textarea top="Описание" getRef={eventDescription} defaultValue={0} />

        <Button size="xl" onClick={onSubmit}>Создать</Button>

      </FormLayout>
    </Panel>
  );

};

export default EventCreate;
