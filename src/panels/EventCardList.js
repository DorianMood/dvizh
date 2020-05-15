import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Group,
  CardGrid,
  CellButton,
  View,
  ModalRoot,
  ModalPage,
  Cell,
  Switch,
  ModalPageHeader,
  Title,
} from "@vkontakte/vkui";

import Icon24Sort from "@vkontakte/icons/dist/24/sort";

import ProjectCard from "./EventCard";

const MAIN_MODAL = "main-modal";

const ProjectCardList = (props) => {
  const { events } = props;

  const [currentModal, setCurrentModal] = useState(null);

  

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
        <Cell asideContent={<Switch />}>Рядом</Cell>
        <Cell asideContent={<Switch />}>Скоро</Cell>
        <Cell asideContent={<Switch />}>Комментарии к записям</Cell>
        <Cell></Cell><Cell></Cell>
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
          {events.map((project, key) => (
            <ProjectCard key={key} project={project} />
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
