import React, { useState, useEffect } from "react";
import { Panel, Spinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import firebase from "firebase/app";
import "firebase/database";

import "./UserProfile.css";
import EventCardList from "../Event/EventCardList";
import UserHeader from "./UserHeader";
import EventAdd from "../components/EventAdd";
import Filter from "../../utils/Filter";
import InfiniteScroll from 'react-infinite-scroller';
import EventScan from "../components/EventScan";

const UserProfile = (props) => {

  // TODO : here we can render user related data first

  // Fetch data
  const database = firebase.database();
  const [loading, setLoading] = useState(true);

  const [fetchedUser, setUser] = useState(null);
  const [fetchedEvents, setEvents] = useState([]);
  const [filter, setFilter] = useState(new Filter(3000, null));
  const [location, setLocation] = useState([56.85, 60.6]);

  /*
  Fetch VK user data and save it to state.
  */
  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setLocation([location.lat, location.long]);
    }
    fetchData();
  }, [filter]);

  /*
  Fetch events from firebase.
  */
  // TODO : make it work with filter
  // may be it is better just to move all the logic inside EventList component
  const nextPage = () => {
    let last = fetchedEvents[fetchedEvents.length - 1];
    let query = database.ref("events").orderByKey();
    if (fetchedEvents.length > 0) {
      query = query.startAt(last.id);
    }
    query.limitToFirst(3).on("value", dataSnapshot => {
      let events = dataSnapshot.val() ? Object.entries(dataSnapshot.val()).map(e => {
        return { id: e[0], ...e[1] };
      }) : []; if (fetchedEvents.length > 0) events.splice(0, 1);
      if (events.length > 0) {
        setEvents([...fetchedEvents, ...events]);
      } else if (loading) {
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    nextPage();
  }, [database]);

  console.log(location);

  const filteredEvents = filter.filter(fetchedEvents, location);

  return (
    <Panel>
      <UserHeader user={fetchedUser} />
      <InfiniteScroll threshold={0} loadMore={nextPage} hasMore={loading} loader={<Spinner key={0} />}>
        <EventCardList events={filteredEvents} filter={filter} setFilter={setFilter} />
      </InfiniteScroll>
      <EventAdd />
      <EventScan />
    </Panel>
  );
};

export default UserProfile;
