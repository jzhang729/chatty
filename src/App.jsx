import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            data: {
                currentUser: { name: "Anonymous" },
                messages: []
            }
        }
        this._handleNewMessage = this._handleNewMessage.bind(this);
        this._handleUser = this._handleUser.bind(this);
    }

    componentDidMount () {
        this.socket = new WebSocket("ws://localhost:4000");
        var newState = this.state;
        this.socket.onmessage = (evt) => {
            const message = JSON.parse(evt.data);
            switch (message.type) {
                case "incomingMessage":
                    newState.data.messages.push(message);
                    break;
                case "incomingNotification":
                    newState.data.messages.push(message);
                    break;
                default:
                    throw new Error("Huh?");
                    break;
            }
            this.setState({ newState });
        };
    }

    _handleNewMessage (e) {
        if (e.key === "Enter") {
            var msg = {
                type: "postMessage",
                username: this.state.data.currentUser.name,
                content: e.target.value
            }

            this.socket.send(JSON.stringify(msg));
            e.target.value = "";
        }


    }

    _handleUser (e) {
        var oldUser = this.state.data.currentUser.name;
        var newUser = e.target.value;

        var newState = this.state;
        newState.data.currentUser.name = newUser;
        this.setState({ newState });

        var msg = {
            type: "postNotification",
            username: newUser,
            content: `${oldUser} has changed their name to ${newUser}`
        }

        this.socket.send(JSON.stringify(msg));
    }

    render () {
        return (
            <div className="wrapper">
                <nav>
                    <h1>Chatter</h1>
                </nav>
                <MessageList
                    messages={this.state.data.messages} />
                <ChatBar
                    currentUser={this.state.data.currentUser.name}
                    handleUser={this._handleUser}
                    onKeyUp={this._handleNewMessage} />
            </div>
        );
    }
}

export default App;
