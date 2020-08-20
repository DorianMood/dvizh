import React, { useState, useEffect } from "react";
import { Panel, Spinner, Div } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import firebase from "firebase/app";
import { getDistance } from "geolib";

import { YMaps, Map, Placemark, Circle } from 'react-yandex-maps';

import EventCardList from "../Event/EventCardList";
import Filter from "../../utils/Filter";
import InfiniteScroll from "react-infinite-scroller";

const LocationEvents = (props) => {

  // Fetch data
  const database = firebase.database();
  const [loading, setLoading] = useState(true);

  const [fetchedEvents, setEvents] = useState([]);
  const [location, setLocation] = useState([56.85, 60.6]);
  const [filter, setFilter] = useState(new Filter(3000, null));

  useEffect(() => {
    async function fetchData() {
      const location = await bridge.send("VKWebAppGetGeodata");
      setLocation([location.lat, location.long]);
    }
    fetchData();
  }, []);

  /*
  Fetch events from firebase.
  */
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
  }, []);

  // Filter fetched events
  const filteredEvents = fetchedEvents.filter(event => {
    if (filter['location']) {
      const distanceFromMe = getDistance(
        { latitude: event.location.lat, longitude: event.location.lng },
        { latitude: location[0], longitude: location[1] }
      );
      if (distanceFromMe <= filter.location)
        return true;
    }
    return false;
  });

  return (
    <Panel>
      <Div style={{ height: "240px", padding: 0 }}>
        <YMaps >
          <Map defaultState={{ center: location, zoom: 10 }} width={'100%'}>
            <Placemark geometry={location} options={{ preset: "islands#redCircleDotIcon" }} />
            {
              filteredEvents.map((event, id) => {
                const geometry = [event.location.lat, event.location.lng];
                return (<Placemark key={id} geometry={geometry} />)
              })
            }
            <Circle geometry={[location, filter['location'] /*metrs*/]} />
          </Map>
        </YMaps>
      </Div>
      <InfiniteScroll threshold={0} loadMore={nextPage} hasMore={loading} loader={<Spinner key={0} />}>
        <EventCardList events={filteredEvents} filter={filter} setFilter={setFilter} />
      </InfiniteScroll>
    </Panel>
  );
};

export default LocationEvents;
