import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Group,
  CardGrid,
  CellButton,
  View,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Title,
} from "@vkontakte/vkui";

import Icon24Sort from "@vkontakte/icons/dist/24/sort";

import EventCard from "./EventCard";
import Filter from "../../utils/Filter";
import FilterPanel from "./FilterPanel";
import { useRoute } from "react-router5";

const MAIN_MODAL = "main-modal";

const ProjectCardList = (props) => {
  const { events } = props;
  const [currentModal, setCurrentModal] = useState(null);
  const [filter, setFilter] = useState(new Filter(null, null));

  const { route } = useRoute();

  const updateFilter = (data) => {
    const {key, value} = data;
    setFilter({
      ...filter,
      [key]: value
    })
  }

  const filterModal = (
    <ModalRoot
      activeModal={currentModal}
      onClose={() => {
        setCurrentModal(null);
      }}
    >
      <ModalPage
        id={MAIN_MODAL}
        header={<ModalPageHeader><Title level="2">Фильтры</Title></ModalPageHeader>}
        dynamicContentHeight
      >
        <FilterPanel filterValues={filter} onUpdate={updateFilter} />
      </ModalPage>
    </ModalRoot>
  );

  const filteredEvents = events.filter((element) => {
    return true;
  });

  return (
    <View modal={filterModal}>
      <Group
        separator="hide"
        header={
          <CellButton
            before={<Icon24Sort />}
            onClick={() => {
              setCurrentModal(MAIN_MODAL);
            }}
          >
            Фильтровать
          </CellButton>
        }
      >
        <CardGrid>
          {events.map((event, key) => (
            <EventCard key={key} event={event} />
          ))}
        </CardGrid>
      </Group>
    </View>
  );
};

ProjectCardList.propTypes = {
  events: PropTypes.array.isRequired,
};

export default ProjectCardList;
