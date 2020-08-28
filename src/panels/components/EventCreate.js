import React, { useState, useEffect, useRef } from "react";
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
import "firebase/storage";
import Jimp from "jimp";

import { initialRating } from "../components/Rating";

const EventCreate = () => {
  // TODO : fix rerendering here

  const [user, setUser] = useState({
    vkId: "dorianmood",
    photo: "",
    firstName: "Developer",
    lastName: "Developer"
  });

  const database = firebase.database();
  const storage = firebase.storage();

  // form refs to get rid of rerendering
  const eventName = useRef();
  const eventPrice = useRef();
  const eventPicture = useRef();
  const eventDescription = useRef();

  // form validation variables
  const defaultValidation = {
    name: false,
    picture: false,
    price: false,
    description: false,
    location: false
  };
  const [eventValidation, setEventValidation] = useState(defaultValidation);

  let dateNow = new Date();
  let defaultDate = dateNow.toISOString().split(".")[0];
  const eventDate = useRef(defaultDate);

  const [location, setLocation] = useState({
    name: "Место",
    coordinates: [56.83890, 60.605192]
  });
  const [userLocation, setUserLocation] = useState([56.83890, 60.605192]);

  useEffect(() => {
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setUserLocation([location.lat, location.long]);
      const userInfo = await bridge.send("VKWebAppGetUserInfo");
      setUser({ vkId: userInfo.id, photo: userInfo.photo_200, firstName: userInfo.first_name, lastName: userInfo.last_name })
    }
    fetchData();
  }, []);

  useEffect(() => {
    const GEOCODER_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_YANDEX_KEY}&geocode=${[location.coordinates[1], location.coordinates[0]].join(',')}&format=json`;

    fetch(GEOCODER_URL).then(response => response.json()).then(data => {
      setLocation({
        ...location,
        name: data.response.GeoObjectCollection.featureMember[0].GeoObject.name
      });
    });
  }, [location.coordinates]);

  const submitEvent = async () => {
    // Create event
    const createdEvent = await database.ref(`events`).push(
      {
        name: eventName.current.value,
        price: eventPrice.current.value,
        date: eventDate.current.valueAsNumber,
        description: eventDescription.current.value,
        location: {
          name: location.name,
          lat: location.coordinates[0],
          lng: location.coordinates[1]
        },
        user: user
      }
    );
    storage.ref("events_pictures").child(createdEvent.key).put(eventPicture.current.files[0]);
    // TODO : need fix here. something goes wrong.
    // Subscribe
    database.ref(`subscriptions/${createdEvent.key}/${user.vkId}`).set({
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo
    }).then(() => console.log("SUBSCRIBTION CREATED"));
    // Create rating
    database.ref(`rating/${createdEvent.key}`).set(
      initialRating.map(item => { return { key: item.key } })
    ).then(() => console.log("RATING CREATED"));
  }

  const onValidate = () => {
    let valid = true;
    const newValidation = {
      name: eventName.current.value.length > 0 || (valid = false),
      picture: eventPicture.current.files.length > 0 || (valid = false),
      date: eventDate.current.value !== null || (valid = false),
      price: eventPrice.current.value !== null || (valid = false),
      description: eventDescription.current.value.length > 0 || (valid = false)
    }
    console.log()
    setEventValidation(newValidation);
    console.log(valid);
    return false & valid;
  }

  const onSubmit = () => {
    if (!onValidate()) {
      eventName.current.status = "error";
      return false;
    }
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
        {/** MAP input */}
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

        {/** NAME input */}
        <Input top="Название" getRef={eventName} status={eventValidation.name ? "default" : "error"} />
        {/** PICTURE input */}
        <File top="Загрузите фото" getRef={eventPicture} before={<Icon24Camera />} controlSize="l" onChange={() => {
          // TODO : resize large files here
          // Jimp.read(eventPicture.current.files[0]);
        }} status={eventValidation.picture ? "default" : "error"}>
          Открыть галерею
        </File>
        {/** DATE input */}
        <Input top="Дата" getRef={eventDate} min={defaultDate} defaultValue={defaultDate} type="datetime-local" status={eventValidation.date ? "default" : "error"} />
        {/** PRICE input */}
        <Input top="Цена" getRef={eventPrice} type="number" defaultValue={0} status={eventValidation.price ? "default" : "error"} />
        {/** DESCRIPTION input */}
        <Textarea top="Описание" getRef={eventDescription} defaultValue={0} status={eventValidation.description ? "default" : "error"} />

        <Button type="submit" size="xl" onClick={onSubmit}>Создать</Button>

      </FormLayout>
    </Panel>
  );

};

export default EventCreate;
