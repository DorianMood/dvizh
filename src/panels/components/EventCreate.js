import React, { useState, useEffect, useContext } from "react";
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

  // TODO : assign user id to event


  const database = firebase.database();

  const [location, setLocation] = useState([56.83890, 60.605192]);
  const [locationName, setLocationName] = useState('Место');
  const [userLocation, setUserLocation] = useState([56.83890, 60.605192]);
  const [event, setEvent] = useState({
    name: "Event name",
    description: "",
    price: 0,
    location: {
      name: locationName,
      lng: location[0],
      lat: location[1]
    }
  });

  useEffect(() => {
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setUserLocation([location.lat, location.long]);
    }
    fetchData();
  }, []);


  let GEOCODER_URL =
    `https://geocode-maps.yandex.ru/1.x/?apikey=${
    process.env.REACT_APP_YANDEX_KEY
    }&geocode=${
    [location[1], location[0]].join(',')
    }&format=json`;

  fetch(GEOCODER_URL).then(response => response.json()).then(data => {
    setLocationName(data.response.GeoObjectCollection.featureMember[0].GeoObject.name);
  });

  const submitEvent = async () => {
    database.ref(`events`).push(
      {
        ...event, location: {
          name: locationName,
          lng: location[0],
          lat: location[1]
        }
      }
    );
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
        <FormLayoutGroup top={locationName}>
          <Div style={{ height: "150px" }}>
            <YMaps>
              <Map
                defaultState={{ center: location, zoom: 10 }}
                height={'150px'} width={'100%'}
                onClick={(e) => { setLocation(e.get('coords')) }}
              >
                <Placemark geometry={userLocation} options={{ preset: "islands#redCircleDotIcon" }} />
                <Placemark geometry={location} />
              </Map>
            </YMaps>
          </Div>
        </FormLayoutGroup>


        <Input top="Название" onChange={e => setEvent({ ...event, name: e.target.value })} />
        <File top="Загрузите фото" before={<Icon24Camera />} controlSize="l" onChange={e => setEvent({ ...event, photo: e.target.value })} >
          Открыть галерею
        </File>
        <Input top="Цена" type="number" defaultValue={0} onChange={e => setEvent({ ...event, price: e.target.value })} />
        <Textarea top="Описание" defaultValue={0} onChange={e => setEvent({ ...event, description: e.target.value })} />

        <Button size="xl"
          onClick={() => {
            submitEvent().then(() => {
              window.history.back();
            });
          }}
        >
          Создать
        </Button>

      </FormLayout>
    </Panel>
  );

};

export default EventCreate;
