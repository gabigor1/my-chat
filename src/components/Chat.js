import React, { useState, useEffect } from 'react';
import { usePubNub } from 'pubnub-react';

function Chat(props) {

  const pubnub = usePubNub();
  const [channels] = useState(['general']);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState([]);

  
  const handleMessage = event => {
    let message = event.message;
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      addMessage(messages => [...messages, [text, props.username]]);
    }
  };

  const sendMessage = message => {
    if (message) {
      pubnub
        .publish({ channel: channels[0], message})
        .then(() => setMessage(''));
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);
  console.log({message})
  console.log({messages});
  console.log(props.username)
  return (
    <div>
      <div className="main-container">
        <div>My-Chat</div>
        <div className="message-box">
          <div className="messages">
            {messages.map((message, index) => {
              const [messageText, username] = message;
              console.log({messageText, username})
              return (
                <div key={index}>
                  {username}: {messageText}
                </div>
              );
            })}
        </div>
        </div>
        <div className="chatbox">
          <div className="chat">
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onKeyPress={event => {
                if (event.key !== 'Enter') return;
                sendMessage(message);
              }}
              onChange={event => setMessage(event.target.value)}
            />
          </div>
          <button
            onClick={event => {
              event.preventDefault();
              sendMessage(message);
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat