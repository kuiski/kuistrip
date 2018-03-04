import React from "react";
import { Chat } from "../components/Chat";
// import './App.css';

import firebase from "firebase";
import { firebaseDb } from '../firebase.js'
const messagesRef = firebaseDb.ref('messages')

const initialState = {
  messages: [],
  user_name: '',
  text: '',
  profile_image: '',
};

export class ChatPage extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onButtonClick() {
    // 簡単なバリデーション
    if(this.state.user_name == "") {
      alert('user_name empty')
      return
    } else if(this.state.text == "") {
      alert('text empty')
      return
    }
    messagesRef.push({
      "user_name" : this.state.user_name,
      "profile_image" : this.state.profile_image,
      "text" : this.state.text,
      "date" : firebase.database.ServerValue.TIMESTAMP,
    })
  }

  onTextChange(e) {
    if(e.target.name == 'user_name') {
      this.setState({
        "user_name": e.target.value,
      });
    } else if (e.target.name == 'profile_image') {
      this.setState({
        "profile_image": e.target.value,
      });
    } else if (e.target.name == 'text') {
      this.setState({
        "text": e.target.value,
      });
    }
  }

  componentWillMount() {
    this.state.messages = [];
    messagesRef.on('child_added', (snapshot) => {
      const m = snapshot.val()
      let msgs = this.state.messages

      msgs.unshift(m);

      this.setState({
        messages : msgs
      });
    })
  }

  render() {
    return (
      <div>
        <Chat
          messages={this.state.messages}
          onButtonClick={this.onButtonClick}
          onTextChange={this.onTextChange}
        />
      </div>
    );
  }
}
