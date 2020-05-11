import React from "react";
import PropTypes from "prop-types";
import { platform, IOS, Card } from "@vkontakte/vkui";

const osName = platform();

const ProjectCard = (props) => (
  <Card size="l">
    <div>{props.project.id}</div>
    <div>{props.project.name}</div>
    <div>{props.project.description}</div>
    <div>{props.project.price}</div>
    <div>{props.project.location.name}</div>
    <div>{props.project.location.lat}</div>
    <div>{props.project.location.lng}</div>
  </Card>
);

ProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
};

export default ProjectCard;
