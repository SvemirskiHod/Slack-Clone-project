import React, {Component} from 'react';

class Message extends Component {
  render() {
    var messageColor = {color: this.props.messageData.color}
    return (
      <div className={this.props.messageData.type}>
        <span style={messageColor} className="username">{this.props.messageData.username}</span>
        <span className="content">{this.props.messageData.content}</span>
      </div>
    );
  }
}
export default Message;
// style={color}