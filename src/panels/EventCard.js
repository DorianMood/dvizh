import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Cell, Button, Avatar } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import { useRouter, withRouter } from "react-router5";

const ProjectCard = (props) => {
  const { event } = props;
  const { projectShow, projectShowChange } = useState(null);
  const { router } = withRouter();

  if (projectShow)
    return (
      <>
      show
      </>
    );

  return (
    <Card size="l" onClick={() => {  console.log('card click') }}>
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
            {event.location.name}
          </div>
        }
        asideContent={
          <div>
            <Icon24MoneyCircle />
            {Math.round(event.price)}
          </div>
        }
        bottomContent={
          <>
            <div>{event.description}</div>
            <div style={{ display: "flex" }}>
              <Button size="m" onClick={(e) => { e.stopPropagation(); console.log('click will participate') }}>Пойду</Button>
              <Button size="m" onClick={(e) => { e.stopPropagation(); console.log('hide') }} mode="secondary" style={{ marginLeft: 8 }}>
                Скрыть
              </Button>
            </div>
          </>
        }
      >
        {event.name}
      </Cell>
    </Card>
  );
};

ProjectCard.propTypes = {
  event: PropTypes.any.isRequired,
};

export default ProjectCard;
