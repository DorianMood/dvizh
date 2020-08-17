import React, { useEffect, useState } from "react";
import {
  Div,
  Title
} from "@vkontakte/vkui";
import firebase from "firebase";
import "firebase/database";

const Rating = (props) => {

  const { eventId, userId } = props;
  //const userId = 3;

  const database = firebase.database();

  const initialRating = [
    { key: "😊", value: [] },
    { key: "😴", value: [] },
    { key: "😍", value: [] },
    { key: "🤬", value: [] },
  ];

  const [rating, setRating] = useState();

  useEffect(() => {
    const fetchData = async () => {
      database.ref(`rating/${eventId}`).on("value", dataSnapshooot => {
        const fetchedValue = dataSnapshooot.val();
        const ratingData = fetchedValue ? fetchedValue.map(item => {
          return {
            key: item.key,
            value: Array.isArray(item.ids) ? item.ids.length : 0,
            set: Array.isArray(item.ids) && item.ids.indexOf(userId) !== -1
          };
        }) : initialRating;
        setRating(ratingData);
      });
    };
    fetchData();
  }, [database, eventId, initialRating, userId]);

  const onRate = (key) => {
    // TODO : create rating if hasn't rate otherwise

    console.log(rating);

    database.ref(`rating/${eventId}`).set(
      initialRating.map(item => {
        return { key: item.key, ids: [1, 2] };
      })
    );
  }

  if (eventId) {
    console.log("event");
  }

  return (
    <Div style={{ display: "flex" }}>
      {(rating ? rating : initialRating).map((item, key) => (
        <Div key={key} style={{ display: "flex", flexDirection: "column", flex: 1 }} onClick={() => onRate(item.key)}>
          <Title level={item.set ? "1" : "2"} style={{ textAlign: "center" }}>{item.key}</Title>
          <Title level={item.set ? "2" : "3"} style={{ textAlign: "center" }}>{item.value}</Title>
        </Div>
      ))}
    </Div>
  )
};

Rating.propTypes = {
};

export default Rating;
