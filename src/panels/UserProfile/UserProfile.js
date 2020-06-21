import React, { useState, useEffect } from "react";
import { Panel, PanelSpinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import "./UserProfile.css";
import EventCardList from "../Event/EventCardList";
import UserHeader from "./UserHeader";

const GET_PROJECTS = gql`
  {
    Events(id: "123") {
      id
      name
      description
      price
      location {
        lat
        lng
        name
      }
    }
  }
`;

/*
  TODO : use Firebase events query instead of graphql.
  Get all the events of certain user.
*/

const UserProfile = (props) => {
  
  // Fetch data
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const rating = [
    { key: "😊", value: 101 },
    { key: "😴", value: 11 },
    { key: "😍", value: 35 },
    { key: "🤬", value: 4 },
  ];

  const [fetchedUser, setUser] = useState(null);

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
    }
    fetchData();
  }, []);

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
  if (error) return `Error: ${error.message}`;

  return (
    <Panel>
      <UserHeader user={fetchedUser} rating={rating} />
      <EventCardList events={data.Events} />
    </Panel>
  );
};

export default UserProfile;
