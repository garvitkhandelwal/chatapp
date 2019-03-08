import React, { Component } from 'react';


const dummy_data = [
	{
		name: 'Garvit',
		text: 'is cool.'
	},
	{
		name: 'xyz',
		text: "isn't cool."
	},
	{
		name: 'abc',
		text: 'is the worst of them all.'
	}
]


class MessageList extends Component {
	render() {
		return (
			<div className="message-list">
				{dummy_data.map((message, index) => {
					return (
						<div key={index} className="message">
							<div className="message.username">{message.name}</div>
							<div className="message.text">{message.text}</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default MessageList;