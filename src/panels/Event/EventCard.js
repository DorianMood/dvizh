import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Cell, Button, Avatar } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";
import { useRoute } from "react-router5";

const ProjectCard = (props) => {

  const { event } = props;
  const { router } = useRoute();

  const SERVICE_KEY = process.env.REACT_APP_VK_API_SERVICE_KEY;
  const VK_GET_USER = `https://api.vk.com/method/users.get?user_id=${event.user.vkId}&fields=photo_100&v=5.52&access_token=${SERVICE_KEY}`;

  useEffect(() => {
    fetch(VK_GET_USER)
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  return (
    <Card size="l" onClick={() => { router.navigate('event', { id: event.id, event }); console.log('card click') }}>
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
