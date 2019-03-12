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
			roomId: null,
			messages: [],
			joinableRooms: [],
			joinedRooms: []
		}
		this.sendMessage = this.sendMessage.bind(this)
		this.subscribeToRoom = this.subscribeToRoom.bind(this)
		this.getRooms = this.getRooms.bind(this)
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
			this.currentUser = currentUser
			this.getRooms()
		})
		.catch(err => console.log('error in connecting: ',err))
	}

	getRooms() {
		this.currentUser.getJoinableRooms()
		.then(joinableRooms => {
			this.setState({
				joinableRooms,
				joinedRooms: this.currentUser.rooms
			})
		})
		.catch(err => console.log('error on joinableRooms: ',err))
	}

	subscribeToRoom(roomId) {
		this.setState({
			messages: []
		})
		this.currentUser.subscribeToRoom({
			roomId: roomId,
			hooks: {
				onNewMessage: message => {
					this.setState({
						messages: [...this.state.messages, message]
					})
				}
			}
		})
		.then(room => {
			this.setState({
				roomId: room.id
			})
			this.getRooms()
		})
		.catch(err => console.log('error in subscribing to rooms ',err))
	}


	sendMessage(text){
		this.currentUser.sendMessage({
		  text,                             //text: text
			roomId: this.state.roomId
		})
	}

  render() {
    return (
      <div className="App">
        <RoomList
					roomId = {this.state.roomId}
					subscribeToRoom= {this.subscribeToRoom}
					rooms= {[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
				<MessageList messages= {this.state.messages} />
				<SendMessageForm sendMessage= {this.sendMessage}/>
				<NewRoomForm />
      </div>
    );
  }
}

export default App;
