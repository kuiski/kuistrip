import React, { Component } from 'react';
import moment from "moment";
import Card, { CardContent, CardHeader } from "material-ui/Card";
import Avatar from "material-ui/Avatar";

const styles = {
  cardHolder: {
    width: 300,
    margin: 20
  },
  card: {
    display: "flex"
  },
  avatar: {
    margin: "auto 10px auto 0"
  },
  content: {
    display: "flex",
    verticalAlign: "middle",
    margin: 0,
    padding: 0
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    color: "#aaa"
  },
};

export default class Message extends React.Component {
  render() {
    return (
      <div style={styles.cardHolder}>
        <Card styles={styles.card}>
          <CardContent>
            {this.props.message.text}
            <div style={styles.footer}>
              {moment(this.props.message.date).format("YYYY年M月D日 HH:mm:SS")}
            </div>
          </CardContent>
          <CardHeader
            title={this.props.message.user_name}
            avatar={<Avatar src={this.props.message.profile_image} style={styles.avatar} />}
          />
        </Card>
      </div>
    );
  }
}
