import React from "react";
import PropTypes from "prop-types";
import { Card, Cell, Button, Avatar } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";
import Icon16Place from "@vkontakte/icons/dist/16/place";
import Icon24MoneyCircle from "@vkontakte/icons/dist/24/money_circle";

const Project = (props) => {
  const { project } = props;

  return (
    <Panel id={this.props.id}>
      <PanelHeader
        left={
          <HeaderButton onClick={this.navigationBack.bind(this)}>
            {<Icon24User />}
          </HeaderButton>
        }
      >
        Проект
      </PanelHeader>
    </Panel>
  );
};

Project.propTypes = {
  project: PropTypes.any.isRequired,
};

export default Project;
