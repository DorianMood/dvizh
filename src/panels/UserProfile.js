import React from "react";
import PropTypes from "prop-types";
import {
  Panel,
  Group,
  CardGrid,
  CellButton,
  Avatar,
  RichCell,
  Progress,
  Div,
  InfoRow,
  Title,
} from "@vkontakte/vkui";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon24Sort from "@vkontakte/icons/dist/24/sort";

import Rating from "./Rating";
import ProjectCard from "./ProjectCard";
import "./UserProfile.css";

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

const UserProfile = (props) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const rating = [
    { key: "😊", value: 101 },
    { key: "😴", value: 11 },
    { key: "😍", value: 35 },
    { key: "🤬", value: 4 },
  ];

  if (loading) return <p>loading...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <Panel id={props.id}>
      <RichCell
        className="user-profile-header"
        disabled
        multiline
        before={
          <Avatar size={72}>
            <Icon24User />
          </Avatar>
        }
        text={
          <Div className="user-profile-satisfied">
            {rating.map((item) => (
              <Div className="user-profile-satisfied-col">
                <Title level="2">{item.key}</Title>
                <Title level="3">{item.value}</Title>
              </Div>
            ))}
          </Div>
        }
      >
        <Title level="2" weight="regular" style={{ textAlign: "center" }}>
          Никита Долгошеин
        </Title>
      </RichCell>

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

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserProfile;
