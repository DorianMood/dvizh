import React from "react";
import PropTypes from "prop-types";
import { PanelHeaderButton } from "@vkontakte/vkui";
import Icon24User from "@vkontakte/icons/dist/24/user";

const Event = (props) => {
  const { id, go, prev, event } = props;

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={go} data-to={prev}>
            {<Icon24User />}
          </PanelHeaderButton>
        }
      >
        Событие
      </PanelHeader>
    </Panel>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  prev: PropTypes.string.isRequired
};

export default Event;
