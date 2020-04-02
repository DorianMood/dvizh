import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { VKMiniAppAPI } from '@vkontakte/vk-mini-apps-api';

import Home from './panels/Home';
import Persik from './panels/Persik';
import ProjectCardList from './panels/ProjectCardList';

const client = new ApolloClient({
	uri: "http://localhost:4001/"
})

const api = new VKMiniAppAPI();
api.initApp();
window.vkMiniAppAPI = api;

const App = () => {
	const [activePanel, setActivePanel] = useState('projects');
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

	return (
		<ApolloProvider client={client}>
			<View activePanel={activePanel}>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				></meta>
				<Home id='home' fetchedUser={fetchedUser} go={go} />
				<ProjectCardList id='projects' go={go} />
				<Persik id='persik' go={go} />
			</View>
		</ApolloProvider>

	);
}

export default App;

