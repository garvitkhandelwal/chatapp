import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList.js'
import NewRoomForm from './components/NewRoomForm.js'
import RoomList from './components/RoomList.js'
import SendMessageForm from './components/SendMessageForm.js'
import './App.css';
import {tokenURL, instanceLocator} from './config'

class App extends Component {

	constructor() {
		super()
		this.state = {
			messages = []
		}
	}

	componentDidMount() {
		const chatManager = new Chatkit.ChatManager({
			instanceLocator,
			userId: 'Garvit',
			tokenProvider: new Chatkit.TokenProvider({
				url: tokenURL
			})
		})

		chatManager.connect()
		.then(currentUser => {
			currentUser.subscribeToRoom({
				roomId: 19386161,
				hooks: {
					onNewMessage: message => {
						console.log('message.text: ', message.text);
					}
				}
			})
		})
	}

  render() {
    return (
      <div className="App">
        <RoomList />
		<MessageList />
		<SendMessageForm />
		<NewRoomForm />
      </div>
    );
  }
}

export default App;
