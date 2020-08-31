import React, { useEffect, useState } from "react";
import {
  Title,
  Tabs,
  TabsItem
} from "@vkontakte/vkui";
import firebase from "firebase";
import "firebase/database";

export const initialRating = [
  { key: "😊", value: [] },
  { key: "😴", value: [] },
  { key: "😍", value: [] },
  { key: "🤬", value: [] },
];

const Rating = (props) => {

  const { eventId, userId } = props;

  const database = firebase.database();

  const [rating, setRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      database.ref(`rating/${eventId}/rating`).on("value", dataSnapshooot => {
        const fetchedValue = dataSnapshooot.val();
        if (fetchedValue === null || typeof (fetchedValue) !== typeof ([])) {
          database.ref(`rating/${eventId}/rating`).set(initialRating.map((element, index) => {
            return { key: element.key, ids: [] }
          }));
          window.location.reload();
        }
        const ratingData = fetchedValue ? fetchedValue.map(item => {
          return {
            key: item.key,
            value: item.ids ? Object.values(item.ids).length : 0,
            set: item.ids ? Object.keys(item.ids).indexOf(`${userId}`) !== -1 : false
          };
        }) : initialRating;
        setRating(ratingData);
      });
    };
    fetchData();
  }, [userId, eventId]);

  const onRate = (key) => {
    rating.forEach((element, index) => {
      if (element.key === key) {
        database.ref(`rating/${eventId}/rating/${index}/ids/${userId}`).set(true);
      } else {
        database.ref(`rating/${eventId}/rating/${index}/ids/${userId}`).remove();
      }
    });
  }

  if (!eventId) {
    // User profile rating
    const r = {};
    database.ref(`rating/`).orderByChild("owner").equalTo(userId).on("value", dataSnapshoot => {
      const userRating = dataSnapshoot.val();
      Object.values(userRating).map(item => {
        item.rating.forEach(item => {
          const points = Object.keys(item.ids ? item.ids : []).length;
          r[item.key] = r[item.key] ? r[item.key] + points : points;
        });
      });
    });
    const rating = Object.keys(r).map(key => {
      return {
        key: key,
        value: r[key]
      }
    });
    return (
      <Tabs>
        {rating.map((item, key) => (
          <TabsItem key={key}>
            <Title>{item.key}</Title>
            <Title>{item.value}</Title>
          </TabsItem>
        ))}
      </Tabs>
    );
  }

  return (
    <Tabs>
      {(rating ? rating : initialRating).map((item, key) => (
        <TabsItem selected={item.set} key={key} onClick={() => { onRate(item.key) }}>
          <Title>{item.key}</Title>
          <Title>{item.value}</Title>
        </TabsItem>
      ))}
    </Tabs>
  )
};

export default Rating;
