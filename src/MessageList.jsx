import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div id="message-list">
        {this.props.messages.map(function(message){
          return (<Message key={message.id} messageData={message}/>)
        })}
        <div class="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default MessageList;

