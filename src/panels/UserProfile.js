import React, { useState, useEffect } from "react";
import { Panel, Avatar, RichCell, Div, Title, Spinner } from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import Icon24User from "@vkontakte/icons/dist/24/user";

import "./UserProfile.css";
import ProjectCardList from "./EventCardList";

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

  const userName = "Никита Долгошеин";

  // Display loading animation
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Spinner size="large" style={{ marginTop: 20 }} />
      </div>
    );
  if (error) return `Error: ${error.message}`;

  return (
    <Panel>
      <RichCell
        className="user-profile-header"
        disabled
        multiline
        before={
          <Avatar
            size={72}
            src={fetchedUser !== null ? fetchedUser.photo_200 : null}
          >
            {fetchedUser === null ? <Icon24User /> : null}
          </Avatar>
        }
        text={
          <Div className="user-profile-satisfied">
            {rating.map((item, key) => (
              <Div className="user-profile-satisfied-col" key={key}>
                <Title level="2">{item.key}</Title>
                <Title level="3">{item.value}</Title>
              </Div>
            ))}
          </Div>
        }
      >
        <Title level="2" weight="regular">
          {fetchedUser !== null
            ? `${fetchedUser.first_name} ${fetchedUser.last_name}`
            : userName}
        </Title>
      </RichCell>

      <ProjectCardList events={data.Events} />
    </Panel>
  );
};

export default UserProfile;
