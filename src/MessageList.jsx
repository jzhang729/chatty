import React from "react";
import Message from "./Message.jsx";

class MessageList extends React.Component {

    render () {
        return (
            <div id="message-list">
                { this.props.messages.map((message) => {
                    return <Message message={message} />
                })}
            </div>
        );
    }

}

export default MessageList;
