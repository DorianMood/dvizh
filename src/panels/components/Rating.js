import React, { useEffect, useState } from "react";
import {
  Div,
  Title
} from "@vkontakte/vkui";
import firebase from "firebase";
import "firebase/database";
import { element } from "prop-types";

export const initialRating = [
  { key: "😊", value: [] },
  { key: "😴", value: [] },
  { key: "😍", value: [] },
  { key: "🤬", value: [] },
];

const Rating = (props) => {

  const { eventId, userId } = props;
  //const userId = 3;

  const database = firebase.database();


  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      database.ref(`rating/${eventId}`).on("value", dataSnapshooot => {
        const fetchedValue = dataSnapshooot.val();
        const ratingData = fetchedValue ? fetchedValue.map(item => {
          return {
            key: item.key,
            value: item.ids ? Object.values(item.ids).length : 0
          };
        }) : initialRating;
        setRating(ratingData);
      });
    };
    fetchData();
  }, [database]);

  const onRate = (key) => {
    rating.forEach((element, index) => {
      if (element.key === key) {
        database.ref(`rating/${eventId}/${index}/ids/${userId}`).set(true);
      } else {
        database.ref(`rating/${eventId}/${index}/ids/${userId}`).remove();
      }
    });
  }

  if (eventId) {
    console.log("user id : ", userId);
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

export default Rating;
