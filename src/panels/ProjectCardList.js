import React from "react";
import PropTypes from "prop-types";
import { Panel, Group, CardGrid, CellButton } from "@vkontakte/vkui";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Icon24Sort from "@vkontakte/icons/dist/24/sort";

import ProjectCard from "./ProjectCard";

const GET_PROJECTS = gql`
  {
    Events(id: "123") {
      id
      name
      description
      price
      location {
        lat
        lng
        name
      }
    }
  }
`;

const ProjectCardList = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>loading...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <Panel id={props.id}>
      <Group
        separator="hide"
        header={<CellButton before={<Icon24Sort />}>Фильтровать</CellButton>}
      >
        <CardGrid>
          {data.Events.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
};

ProjectCardList.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default ProjectCardList;
