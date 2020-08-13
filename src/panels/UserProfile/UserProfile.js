import React, { useState, useEffect, useContext } from "react";
import { Panel, PanelSpinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import firebase from "firebase/app";
import "firebase/database";

import "./UserProfile.css";
import EventCardList from "../Event/EventCardList";
import UserHeader from "./UserHeader";
import EventAdd from "../components/EventAdd";
import Filter from "../../utils/Filter";
import { AuthContext } from "../../auth/AuthProvider";

const UserProfile = (props) => {

  const firebaseUser = useContext(AuthContext);

  // TODO : here we can render user related data first

  // Fetch data
  const database = firebase.database();
  const [loading, setLoading] = useState(true);

  const [fetchedUser, setUser] = useState(null);
  const [fetchedEvents, setEvents] = useState([]);
  const [filter, setFilter] = useState(new Filter(0, null));

  /*
  Fetch VK user data and save it to state.
  */
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


  /*
  Fetch events from firebase.
  */
  useEffect(() => {
    function fetchEvents() {
      // Events data
      database.ref("events").on("value", dataSnapshot => {
        const events = Object.entries(dataSnapshot.val()).map(e => {
          return { id: e[0], ...e[1] };
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
      <UserHeader user={fetchedUser} />
      <EventCardList events={fetchedEvents} filter={filter} setFilter={setFilter} />
      <EventAdd />
    </Panel>
  );
};

export default UserProfile;
