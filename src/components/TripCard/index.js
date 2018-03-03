import React from "react";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";

const styles = {
  cardHolder: {
    width: 300,
    margin: 20
  },
  card: {
    display: "flex"
  },
  cardMedia: {
    height: 200
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
  title: {
    margin: "auto 0",
    color: "#666",
    fontSize: 15
  },
  footer: {
    margin: "10px auto 0 5px",
    fontSize: 12,
    textAlign: "left",
    color: "#aaa"
  },
  link: {
    cursor: "pointer"
  }
};

export const TripCard = props => (
  <div style={styles.cardHolder}>
    <Card styles={styles.card}>
      <CardMedia
        image={props.image}
        title={props.title}
        style={styles.cardMedia}
      />
      <CardContent>
        <div style={styles.content}>
          <Avatar src={props.owner.icon} style={styles.avatar} />
          <div style={styles.title}>
            <a onClick={props.onSelect} style={styles.link}>
              {props.title}
            </a>
          </div>
        </div>
        <div style={styles.footer}>
          {props.startDate.format("YYYY年M月D日")}から{props.endDate.format(
            "M月D日"
          )}{" "}
          ({props.period}日間) {props.members}人
        </div>
      </CardContent>
    </Card>
  </div>
);
