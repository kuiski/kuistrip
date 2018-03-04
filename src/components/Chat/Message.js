import React, { Component } from 'react';

const styles = {
  image: {
    width: '30px',
    height: '30px'
  },
  user_name: {
  },
  text: {
  },
};

export default class Message extends React.Component {
  render() {
    return (
      <div className="Message">
        <img src={this.props.message.profile_image} style={styles.image} />
        <p style={styles.user_name}>{this.props.message.user_name}</p>
        <p style={styles.text}>{this.props.message.text}</p>
      </div>
    );
  }
}
