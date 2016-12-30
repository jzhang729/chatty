import React, {Component} from "react";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            currentUser: { name: "Anonymous" },
            messages: [
                {
                    username: "Bob",
                    content: "Has anyone seen my marbles?"
                },
                {
                    username: "Anonymous",
                    content: "No, I think you lost them. You lost your marbles, Bob. You lost them for good."
                }
            ]
        }
        this._handleNewMessage = this._handleNewMessage.bind(this);
    }

    componentDidMount () {
        this.socket = new WebSocket("ws://localhost:4000");

    }

    _handleNewMessage (e) {
        if (e.key === "Enter") {
            var msg = {
                username: "Anonymous",
                content: e.target.value
            }

            this.setState({ messages: [...this.state.messages, msg] });
        }
    }

    render () {
        return (
            <div className="wrapper">
                <nav>
                    <h1>Chatter</h1>
                </nav>
                <MessageList messages={this.state.messages} />
                <ChatBar
                    currentUser={this.state.currentUser}
                    onKeyUp={this._handleNewMessage} />
            </div>
        );
    }
}

export default App;
