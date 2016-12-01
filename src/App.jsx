import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id: 1
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id: 2
    }
  ]
};


class App extends Component {
  constructor(props) {
      super(props);
      this.state = data;
    }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      const messages = this.state.messages.concat(parsedMessage);
      this.setState({messages: messages})
    }
  }

  updateCurrentUser(userName){
    this.setState({currentUser: {
      name: userName
    }})
  }

  updateMessages(newMessage) {

    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
       <div className="wrapper">
         <nav>
          <h1>Chatty</h1>
         </nav>
         <MessageList messages={this.state.messages}/>
         <ChatBar updateMessages={this.updateMessages.bind(this)}
                  currentUser={this.state.currentUser}
                  updateCurrentUser={this.updateCurrentUser.bind(this)}/>
       </div>
      </div>
    );
  }
}
export default App;
