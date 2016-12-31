import React from 'react';

class ChatBar extends React.Component {

    render () {
        return (
            <footer>
                <input onBlur={this.props.handleUser}
                    id="username"
                    type="text"
                    placeholder="Enter your name (Optional)" />
                <input onKeyUp={this.props.onKeyUp} id="new-message" type="text" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default ChatBar;
