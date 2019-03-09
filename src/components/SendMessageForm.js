import React from 'react';

class SendMessageForm extends React.Component {

	handleChange(e){
		console.log(e.target.value)
	}
	render() {
		return(
			<form className='send-message-form'>
				<input onChange={this.handleChange}
				 placeholder="Write a message"
				 type='text' />
			</form>
		);
	}
}

export default SendMessageForm;
