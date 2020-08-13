import React, { useEffect, useState } from "react";
import {
  Div,
  Title
} from "@vkontakte/vkui";
import PropTypes from "prop-types";

const Rating = (props) => {

  const { eventId } = props;

  const ratingData = [
    { key: "😊", value: 101 },
    { key: "😴", value: 11 },
    { key: "😍", value: 35 },
    { key: "🤬", value: 4 },
  ];

  const [rating, setRating] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setRating(ratingData);
    };
    fetchData();
  }, []);

  const onRate = () => {
    console.log("RATE");
  }

  if (!Array.isArray(rating))
    return <></>;

  if (eventId) {
    console.log("event");
  }

  return (
    <Div style={{ display: "flex" }}>
      {rating.map((item, key) => (
        <Div key={key} style={{ display: "flex", flexDirection: "column", flex: 1 }} onClick={onRate}>
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
