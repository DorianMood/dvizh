import React, { useState } from "react";
import View from "@vkontakte/vkui/dist/components/View/View";
import "@vkontakte/vkui/dist/vkui.css";
import { Tabbar, TabbarItem, Epic } from "@vkontakte/vkui";

import Icon28BombOutline from "@vkontakte/icons/dist/28/bomb_outline";
import Icon28PlaceOutline from "@vkontakte/icons/dist/28/place_outline";
import Icon28GhostOutline from "@vkontakte/icons/dist/28/ghost_outline";

import EventCardList from "./EventCardList";
import UserProfile from "./UserProfile";

const TabsRoot = () => {
  const [activeStory, setActiveStory] = useState("projects-my");

  const onStoryChange = (e) => {
    setActiveStory(e.currentTarget.dataset.story);
  };

  return (
    <Epic
      activeStory={activeStory}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === "projects-my"}
            data-story="projects-my"
            text="Мои"
          >
            <Icon28BombOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === "projects-near"}
            data-story="projects-near"
            text="Рядом"
          >
            <Icon28PlaceOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === "projects-friends"}
            data-story="projects-friends"
            text="Друзья"
          >
            <Icon28GhostOutline />
          </TabbarItem>
        </Tabbar>
      }
    >
      <View id="projects-my">
        <UserProfile />
      </View>
      <View id="projects-near">
        <EventCardList events={[]} />
      </View>
      <View id="projects-friends">
        <EventCardList events={[]} />
      </View>
    </Epic>
  );
};

export default TabsRoot;
