import React from "react";
import { Avatar, RichCell, Div, Title } from "@vkontakte/vkui";
import PropTypes from "prop-types";

import Icon24User from "@vkontakte/icons/dist/24/user";

import "./UserProfile.css";

const UserHeader = (props) => {

  const { rating, user } = props;
  const userName = "Никита Долгошеин";

  return (
    <RichCell
      className="user-profile-header"
      disabled
      multiline
      before={
        <Avatar
          size={72}
          src={user !== null ? user.photo_200 : null}
        >
          {user === null ? <Icon24User /> : null}
        </Avatar>
      }
      text={
        <Div className="user-profile-satisfied">
          {rating.map((item, key) => (
            <Div className="user-profile-satisfied-col" key={key}>
              <Title level="2">{item.key}</Title>
              <Title level="3">{item.value}</Title>
            </Div>
          ))}
        </Div>
      }
    >
      <Title level="2" weight="regular">
        {user !== null
          ? `${user.first_name} ${user.last_name}`
          : userName}
      </Title>
    </RichCell>
  );
};

UserHeader.propTypes = {
  rating: PropTypes.array,
  user: PropTypes.object
}

export default UserHeader;
