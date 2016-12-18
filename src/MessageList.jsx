import React from "react";
import Message from "./Message.jsx";

class MessageList extends React.Component {

    render () {
        return (
            <div id="message-list">
                { this.props.messages.map((message, index) => {
                    return <Message message={message} key={index} />
                })}
            </div>
        );
    }
}

export default MessageList;
