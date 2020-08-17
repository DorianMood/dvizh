import React from "react";
import PropTypes from "prop-types";
import { Card, Cell, Avatar } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import { useRoute } from "react-router5";

const ProjectCard = (props) => {

  const { event } = props;
  const { router } = useRoute();

  return (
    <Card size="l" onClick={() => { router.navigate('event', { id: event.id, event }); console.log('card click') }}>
      <Cell
        before={
          <Avatar size={32} src={event.user.photo ?? null}>
            {event.user.photo ? null : <Icon24User />}
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
          <>
            {
              event.price && event.price !== 0 ? (
                <div style={{ textAlign: "center", color: "green" }}>
                  <Icon24MoneyCircle style={{ margin: "0 auto" }} />
                  {Math.round(event.price)}
                </div>
              ) : <></>
            }
            <div>
              {new Date(event.date).toLocaleDateString()}
            </div>
          </>
        }
        bottomContent={
          <>
            <div>{event.description}</div>
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
