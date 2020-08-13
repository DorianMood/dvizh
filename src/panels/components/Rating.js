import React, { useEffect, useState } from "react";
import {
  Div,
  Title
} from "@vkontakte/vkui";
import PropTypes, { element } from "prop-types";
import firebase from "firebase";
import "firebase/database";

const Rating = (props) => {

  const { eventId } = props;

  const database = firebase.database();

  const ratingData = [
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
        const ratingData1 = fetchedValue ? fetchedValue.map(item => {
          return { key: item.key, value: Array.isArray(item.value) ? item.value.length : 0 };
        }) : ratingData;
        setRating(ratingData1);
      });
    };
    fetchData();
  }, []);

  const onRate = (key) => {
    console.log(rating);
    console.log(rating.map(item => {
      return { key: item.key, ids: item.ids }
    }));

    database.ref(`rating/${eventId}`).set(
      ratingData.map(item => {
        return { key: item.key, ids: [1,1] };
      })
    );
  }

  if (eventId) {
    console.log("event");
  }

  console.log("RATING", rating == true);

  return (
    <Div style={{ display: "flex" }}>
      {(rating ? rating : ratingData).map((item, key) => (
        <Div key={key} style={{ display: "flex", flexDirection: "column", flex: 1 }} onClick={() => onRate(item.key)}>
          <Title level="2" style={{ textAlign: "center" }}>{item.key}</Title>
          <Title level="3" style={{ textAlign: "center" }}>{item.value}</Title>
        </Div>
      ))}
    </Div>
  )
};

Rating.propTypes = {
};

export default Rating;
