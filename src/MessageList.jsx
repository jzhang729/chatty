import React from "react";
import Message from "./Message.jsx";

class MessageList extends React.Component {
    render () {
        return (
            <div className="message">
                <Message />
            </div>
        );
    }
}

export default MessageList;
