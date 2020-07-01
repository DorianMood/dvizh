import React, { useState, useEffect } from "react";
import { Panel, PanelSpinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import firebase from "firebase/app";

import "./UserProfile.css";
import EventCardList from "../Event/EventCardList";
import UserHeader from "./UserHeader";

const UserProfile = (props) => {

  // Fetch data
  const database = firebase.database();
  const [loading, setLoading] = useState(true);

  const rating = [
    { key: "😊", value: 101 },
    { key: "😴", value: 11 },
    { key: "😍", value: 35 },
    { key: "🤬", value: 4 },
  ];

  const [fetchedUser, setUser] = useState(null);
  const [fetchedEvents, setEvents] = useState([]);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      // User data
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, [database]);

  useEffect(() => {
    function fetchEvents() {
      // Events data
      database.ref("events").on("value", dataSnapshot => {
        const events = Object.entries(dataSnapshot.val()).map(e => {
          return { id: e[0],  ...e[1]};
        });
        setEvents(events);
        setLoading(false);
      });
    }
    fetchEvents();
  }, [database]);

  // Display loading animation
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <PanelSpinner size="large" />
      </div>
    );

  return (
    <Panel>
      <UserHeader user={fetchedUser} rating={rating} />
      <EventCardList events={fetchedEvents} />
    </Panel>
  );
};

export default UserProfile;
