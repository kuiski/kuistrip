import React from "react";

const styles = {
  image: {
    width: 50,
    height: 50
  }
};

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className="ChatBox">
        <div className="">
          <input name='user_name' onChange={this.props.onTextChange} className=""  placeholder="名前" />
          <input name='profile_image' onChange={this.props.onTextChange} placeholder="プロフィール画像URL" style={styles.image}/>
        </div>

        <textarea name='text' className="" onChange={this.props.onTextChange} />
        <button className="" onClick={this.props.onButtonClick}>送信</button>
      </div>
    );
  }
}
