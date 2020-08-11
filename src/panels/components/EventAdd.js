import React from "react";
import Icon28AddOutline from "@vkontakte/icons/dist/28/add_outline";
import { Avatar } from "@vkontakte/vkui";
import { useRoute } from "react-router5";

const EventAdd = () => {

  const { router } = useRoute();

  return (
    <div
      style={{ position: "fixed", left: 24, bottom: 64, zIndex: 100 }}
      onClick={() => router.navigate('create') }
    >
      <Avatar style={{ background: "var(--button_primary_background)" , boxShadow: "0px 0px 10px red"}}>
        <Icon28AddOutline fill={"var(--button_primary_foreground)"} />
      </Avatar>
    </div>
  );

};

export default EventAdd;
