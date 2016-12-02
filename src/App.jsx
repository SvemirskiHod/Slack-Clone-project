import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  activeUsers: null,
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
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

      if(isNaN(parsedMessage)){
        if(parsedMessage.type === "incomingNotification"){
          parsedMessage.type = "message system";
        }
        else if (parsedMessage.type === "incomingMessage"){
          parsedMessage.type = "message";
        }
        const messages = this.state.messages.concat(parsedMessage);
        this.setState({messages: messages})
      }

      if(!isNaN(parsedMessage)){
        this.setState({activeUsers: parsedMessage});
      }
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
          <span className="activeUsers"> {this.state.activeUsers} user(s) online </span>
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
