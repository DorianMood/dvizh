import React, { useState, useEffect } from "react";
import { Panel, Spinner } from "@vkontakte/vkui";
import firebase from "firebase/app";

import EventCardList from "../Event/EventCardList";

const FriendsEvents = (props) => {
  
  // Fetch data
  const database = firebase.database();
  const [loading, setLoading] = useState(true);

  const [fetchedEvents, setEvents] = useState([]);

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
        <Spinner size="large" style={{  }} />
      </div>
    );

  return (
    <Panel>
      <EventCardList events={fetchedEvents} />
    </Panel>
  );
};

export default FriendsEvents;
