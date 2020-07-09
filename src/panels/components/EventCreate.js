import React, { useState } from "react";
import {
  Panel,
  PanelHeader,
  PanelHeaderButton,
  Div,
  Cell,
  Input,
  Button,
  FormLayout,
  FormLayoutGroup,
  Textarea,
  File
} from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon24MoneyCircle from '@vkontakte/icons/dist/24/money_circle';
import Icon24Article from '@vkontakte/icons/dist/24/article';
import Icon24Play from '@vkontakte/icons/dist/24/play';
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import { YMaps, Placemark, Map, withYMaps } from "react-yandex-maps";


const EventCreate = () => {

  const [location, setLocation] = useState([56.83890, 60.605192]);
  
  // TODO : I need a place name from Yandex maps here

  const submitEvent = (data) => {
    console.log("submit");
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
        Опиши событие
      </PanelHeader>


      <FormLayout>
        <FormLayoutGroup top="Место">
          <Div style={{height: "150px"}}>
          <YMaps>
            <Map
              defaultState={{ center: location, zoom: 10 }}
              height={'150px'} width={'100%'}
              onClick={(e) => { setLocation(e.get('coords')) }}
            >
              <Placemark geometry={[56.838901, 60.605192]} options={{ preset: "islands#redCircleDotIcon" }} />
              <Placemark geometry={location} />
            </Map>
          </YMaps>
          </Div>
        </FormLayoutGroup>


        <Input top="Название" />
        <File top="Загрузите фото" before={<Icon24Camera />} controlSize="l">
          Открыть галерею
        </File>
        <Input top="Цена" type="number" defaultValue={0} />
        <Textarea top="Описание" />

        <Button size="xl"
          onClick={() => {
            submitEvent(null);
            window.history.back();
          }}
        >
          Создать
        </Button>

      </FormLayout>
    </Panel>
  );

};

export default EventCreate;



