import React from "react";

class Message extends React.Component {
    render () {
        var username = this.props.message.username;
        var content = this.props.message.content;
        
        return (
            <div className="message">
                <span className="username">{username}</span>
                <span className="content">{content}</span>
            </div>
        );
    }
}

export default Message;
