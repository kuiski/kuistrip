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

  translate(text) {
    const obj = { text: text };
    const body = Object.keys(obj).map((key)=>key+"="+encodeURIComponent(obj[key])).join("&");
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    };
    return fetch('https://kuistrip-ky.appspot.com/translate/nomlish', {
      method: 'POST',
      body: body,
      headers: headers,
    }).then(function(response) {
      return response.json();
    });
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
    const state = this.state;
    this.translate(this.state.text).then(function(json) {
      messagesRef.push({
        "user_name" : state.user_name,
        "profile_image" : state.profile_image,
        "text" : json.result,
        "raw" : state.text,
        "date" : firebase.database.ServerValue.TIMESTAMP,
      })
    }).catch(function(error) {
      alert('Network Error!!')
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
