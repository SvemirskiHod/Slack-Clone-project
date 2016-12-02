import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
      super(props);
      this.state = {
        content: "",
        lastActiveUser: this.props.currentUser.name
      };
    }

  handleMessageChange(e){
    this.setState({content: e.target.value});
  }

  handleMessageSubmit(e){
    if (e.key === 'Enter'){
      this.props.updateMessages({content: this.state.content,
                                 username: this.props.currentUser.name,
                                 type: "postMessage"});
      this.setState({content: ""});
    }
  }

  handleNameChange(e){
    this.props.updateCurrentUser(e.target.value);
  }

  handleNameSubmit(e){
    let oldUserName = this.state.lastActiveUser;
    let newUserName = this.props.currentUser.name;
    if (e.key === 'Enter' && newUserName != "" && newUserName != oldUserName){
      this.props.updateMessages({content: `${oldUserName} has changed names to ${newUserName}`,
                                 type: "postNotification"});
      this.setState({lastActiveUser: this.props.currentUser.name})
    }
  }

  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name"
               value={this.props.currentUser.name}
               onKeyUp={this.handleNameSubmit.bind(this)}
               onChange={this.handleNameChange.bind(this)}
               />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               value={this.state.content}
               onKeyUp={this.handleMessageSubmit.bind(this)}
               onChange={this.handleMessageChange.bind(this)}
              />
      </footer>
    );
  }
}

export default ChatBar;
