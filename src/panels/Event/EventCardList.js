import React, { useState, useEffect } from "react";
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
import FilterPanel from "./FilterPanel";

const MAIN_MODAL = "main-modal";

const ProjectCardList = (props) => {
  const { events, filter, setFilter } = props;
  const [currentModal, setCurrentModal] = useState(null);
  const [innerFilter, setInnerFilter] = useState(filter);

  useEffect(() => {
    setInnerFilter(filter);
  }, [filter]);


  const updateFilter = (data) => {
    const { key, value } = data;
    setInnerFilter({
      ...innerFilter,
      [key]: value
    })
  }

  let filteredEvents = events.filter((element) => {
    console.log(element);
    return element;
  });

  const filterModal = (
    <ModalRoot
      activeModal={currentModal}
      onClose={() => {
        setFilter(innerFilter);
        setCurrentModal(null);
      }}
    >
      <ModalPage
        id={MAIN_MODAL}
        header={<ModalPageHeader><Title level="2">Фильтры</Title></ModalPageHeader>}
        dynamicContentHeight
      >
        <FilterPanel filterValues={innerFilter} onUpdate={updateFilter} />
      </ModalPage>
    </ModalRoot>
  );

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
          {filteredEvents.map((event, key) => (
            <EventCard key={key} event={event} />
          ))}
        </CardGrid>
      </Group>
    </View>
  );
};

ProjectCardList.propTypes = {
  events: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default ProjectCardList;
