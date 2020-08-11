import React from "react";
import PropTypes from "prop-types";

import { Group, Header, SimpleCell, Avatar } from "@vkontakte/vkui";

const UserSmallCard = (props) => {

  const { user } = props;

  return (
    <Group>
      <Header mode="secondary">Организатор</Header>
      <a href={`https://vk.com/id${user.vkId}`}>
        <SimpleCell before={<Avatar size={40} src={user.photo} after={"textz"} />}>{`${user.firstName} ${user.lastName}`}</SimpleCell>
      </a>
    </Group>
  );
}

UserSmallCard.propTypes = {
  user: PropTypes.any.isRequired,
};

export default UserSmallCard;
