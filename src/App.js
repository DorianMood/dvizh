import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { VKMiniAppAPI } from '@vkontakte/vk-mini-apps-api';

import Icon28BombOutline from '@vkontakte/icons/dist/28/bomb_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28GhostOutline from '@vkontakte/icons/dist/28/ghost_outline';

import Home from './panels/Home';
import Persik from './panels/Persik';
import ProjectCardList from './panels/ProjectCardList';
import { Tabbar, TabbarItem, Epic } from '@vkontakte/vkui';

const client = new ApolloClient({
	uri: 'https://dvizh-api.herokuapp.com/',
	fetchOptions: {
		mode: 'no-cors',
	},
})

const api = new VKMiniAppAPI();
api.initApp();
window.vkMiniAppAPI = api;

const App = () => {
	const [activeStory, setActiveStory] = useState('projects-my');
	const [activePanel, setActivePanel] = useState('projects-my');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const onStoryChange = e => {
		setActiveStory(e.currentTarget.dataset.story);
	};

	return (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
			></meta>
			<ApolloProvider client={client}>
				<Epic activeStory={activeStory} tabbar={
					<Tabbar>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'projects-my'}
							data-story="projects-my"
							text="Мои"
						><Icon28BombOutline /></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'projects-near'}
							data-story="projects-near"
							text="Рядом"
						><Icon28PlaceOutline /></TabbarItem>
						<TabbarItem
							onClick={onStoryChange}
							selected={activeStory === 'projects-friends'}
							data-story="projects-friends"
							text="Друзья"
						><Icon28GhostOutline /></TabbarItem>

					</Tabbar>
				} >
					<View id="projects-my" activePanel="projects">
						<ProjectCardList id="projects" go={go} />
					</View>
					<View id="projects-near" activePanel="projects">
						<ProjectCardList id="projects" go={go} />
					</View>
					<View id="projects-friends" activePanel="projects">
						<ProjectCardList id="projects" go={go} />
					</View>

				</Epic>
			</ApolloProvider>
		</>
	);
}

export default App;

