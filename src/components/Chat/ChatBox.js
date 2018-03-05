import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from 'material-ui/Button';

const styles = {
  box: {
    margin: 20,
  },
  name: {
    width: '30%',
  },
  image: {
    'margin-left': '1%',
    width: '69%',
  },
  button: {
    margin: 12,
  },
  text: {
    'margin-top': 10,
    width: '100%'
  }
};

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className="ChatBox" style={styles.box} >
        <div className="">
          <TextField
            name='user_name'
            placeholder="名前"
            onChange={this.props.onTextChange}
            style={styles.name}
          />
          <TextField
            name='profile_image'
            placeholder="プロフィール画像URL"
            onChange={this.props.onTextChange}
            style={styles.image}
          />
        </div>

        <textarea rows='5' name='text' style={styles.text} onChange={this.props.onTextChange} />
        <RaisedButton primary={true} onClick={this.props.onButtonClick} >送信</RaisedButton>
      </div>
    );
  }
}
