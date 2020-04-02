import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Panel, Header, Group, CardGrid } from '@vkontakte/vkui';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import ProjectCard from './ProjectCard';



const osName = platform();

const GET_PROJECTS = gql`
    {
        projects(id: "123") {
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


const ProjectCardList = props => {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    const api = window.vkMiniAppAPI;

    if (loading) return (<p>loading...</p>);
    if (error) return `Error! ${error.message}`;
    
    api.getUserInfo().then(userInfo => {
        console.log(userInfo.id);
      }).catch(e => {
          console.log(e)
      });

    return (
        <Panel id={props.id}>
            <Group separator="hide" header={<Header mode="secondary">Projects</Header>}>
                <CardGrid>
                    {
                        data.projects.map((project, index) => (
                                <ProjectCard key={index} project={project}/>
                            ))
                    }
                </CardGrid>
            </Group>
        </Panel>
    );
}

ProjectCardList.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default ProjectCardList;
