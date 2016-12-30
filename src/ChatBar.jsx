import React from 'react';

class ChatBar extends React.Component {

    render () {
        return (
            <footer>
                <input id="username" type="text" placeholder="Your Name (Optional)" />
                <input onKeyUp={this.props.onKeyUp} id="new-message" type="text" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default ChatBar;
