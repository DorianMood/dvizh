import React from "react";
import PropTypes from "prop-types";
import { Card, Cell, Button, Avatar } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <Card size="l">
      <Cell
        before={
          <Avatar size={32}>
            <Icon24User />
          </Avatar>
        }
        size="l"
        description={
          <div style={{ display: "flex" }}>
            <Icon16Place />
            {project.location.name}
          </div>
        }
        asideContent={
          <div>
            <Icon24MoneyCircle />
            {Math.round(project.price)}
          </div>
        }
        bottomContent={
          <>
            <div>{project.description}</div>
            <div style={{ display: "flex" }}>
              <Button size="m">Пойду</Button>
              <Button size="m" mode="secondary" style={{ marginLeft: 8 }}>
                Скрыть
              </Button>
            </div>
          </>
        }
      >
        {project.name}
      </Cell>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.any.isRequired,
};

export default ProjectCard;
