import React from "react";
import Icon28ScanViewfinderOutline from '@vkontakte/icons/dist/28/scan_viewfinder_outline';
import { Avatar } from "@vkontakte/vkui";
import { useRoute } from "react-router5";
import bridge from "@vkontakte/vk-bridge";

const EventScan = () => {

  const { router } = useRoute();

  const onScan = () => {
    bridge.send("VKWebAppOpenCodeReader").then(data => {
      console.log("Scanned", data);
      router.navigate("event", { id: data.code_data });
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <div
      style={{ position: "fixed", left: 24, bottom: 128, zIndex: 1 }}
      onClick={onScan}
    >
      <Avatar style={{ background: "var(--button_primary_background)", boxShadow: "0px 0px 10px black" }}>
        <Icon28ScanViewfinderOutline fill={"var(--button_primary_foreground)"} />
      </Avatar>
    </div>
  );

};

export default EventScan;
