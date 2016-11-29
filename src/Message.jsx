import React, {Component} from 'react';
var name = "Joao";
class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="username">{this.props.messageData.username}</span>
        <span className="content">{this.props.messageData.content}</span>
      </div>
    );
  }
}
export default Message;
