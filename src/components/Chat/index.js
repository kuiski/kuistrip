import React, { Component } from 'react';
import Message from './Message.js'
import ChatBox from './ChatBox.js'

export const Chat = props => (
  <div className="App">
    <ChatBox onTextChange={props.onTextChange} onButtonClick={props.onButtonClick} />
    <div className="MessageList">
      {props.messages.map((m, i) => {
        return <Message key={i} message={m} />
      })}
    </div>
  </div>
);
