import React, { Component } from 'react';

class RoomList extends Component {
	render() {
		return(
			<div className="rooms-List">
				<div className="help-text">
					<ul>
					<h3>Your Rooms:</h3>
					{this.props.rooms.map(room => {
						return(
							<li key={room.id} className="room">
								<a
									onClick = {() => this.props.subscribeToRoom(room.id)}
									href="#">
									# {room.name}
								</a>
							</li>
						);
					})}
					</ul>
				</div>
			</div>
		);
	}
}

export default RoomList;
