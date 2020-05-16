import React, { useState } from "react";
import View from "@vkontakte/vkui/dist/components/View/View";
import "@vkontakte/vkui/dist/vkui.css";
import { Tabbar, TabbarItem, Epic } from "@vkontakte/vkui";

import Icon28BombOutline from "@vkontakte/icons/dist/28/bomb_outline";
import Icon28PlaceOutline from "@vkontakte/icons/dist/28/place_outline";
import Icon28GhostOutline from "@vkontakte/icons/dist/28/ghost_outline";

import UserProfile from "./UserProfile";
import FriendsEvents from "./FriendsEvents";
import LocationEvents from "./LocationEvents";

const TABS__ = [
  {
    id: "events-my",
    text: "Мои",
    icon: <Icon28BombOutline />
  },
  {
    id: "events-near",
    text: "Рядом",
    icon: <Icon28PlaceOutline />
  },
  {
    id: "events-friends",
    text: "Друзья",
    icon: <Icon28GhostOutline />
  }
]

const TabsRoot = () => {
  const [activeStory, setActiveStory] = useState("events-my");

  const onStoryChange = (e) => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  const tabBarComponent = (
    <Tabbar>
      {TABS__.map((element, index) =>
        <TabbarItem
          onClick={onStoryChange}
          selected={activeStory === element.id}
          data-story={element.id}
          text={element.text}
          key={index}
        >
          {element.icon}
        </TabbarItem>
      )}
    </Tabbar>
  );

  return (
    <Epic
      activeStory={activeStory}
      tabbar={
        tabBarComponent
      }
    >
      <View id="events-my">
        <UserProfile />
      </View>
      <View id="events-near">
        <LocationEvents />
      </View>
      <View id="events-friends">
        <FriendsEvents />
      </View>
    </Epic>
  );
};

export default TabsRoot;
