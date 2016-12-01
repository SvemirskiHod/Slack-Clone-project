import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
      super(props);
      this.state = {
        content: "",
      };
    }

  handleSubmit(e){
    if (e.key === 'Enter'){
      this.props.updateMessages({content: this.state.content,
                                 username: this.props.currentUser.name});
      this.setState({content: ""})
    }
  }

  handleMessageChange(e){
    this.setState({content: e.target.value});
  }

  handleNameChange(e){
    this.props.updateCurrentUser(e.target.value);

  }

  render() {
    return (
      <footer>
        <input id="username" type="text" placeholder="Your Name"
               value={this.props.currentUser.name}
               onChange={this.handleNameChange.bind(this)}
               />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER"
               value={this.state.content}
               onKeyUp={this.handleSubmit.bind(this)}
               onChange={this.handleMessageChange.bind(this)}
              />
      </footer>
    );
  }
}

export default ChatBar;
