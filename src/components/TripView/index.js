import React from "react";

import Card, { CardActions, CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Avatar from "material-ui/Avatar";

import Button from "material-ui/Button";
import orange from "material-ui/colors/orange";
import NavigateBeforeIcon from "material-ui-icons/NavigateBefore";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const styles = {
  content: {
    maxWidth: 600,
    padding: 30
  },
  titleImage: {
    maxWidth: 600
  },
  card: {
    display: "flex"
  },
  cardMedia: {
    height: 400
  },
  avatar: {
    margin: "auto 10px auto 0"
  },
  user: {
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
  },
  card: {
    marginTop: 30,
    padding: 10
  },
  members: {
    display: "flex"
  },
  button: {
    marginBottom: 20
  },
  date: ok => {
    return {
      textAlign: "center",
      color: ok ? "#f00" : "#aaa"
    };
  }
};

export const TripMember = props => <Avatar src={props.member.icon} />;

export const isMember = (user, users) => {
  return users.find(u => u.name === user.name);
};

export const JoinUnjoinButton = props => {
  if (props.isMember) {
    return (
      <Button
        variant="raised"
        style={styles.button}
        onClick={() => props.onUnjoin(props.user, props.tripId)}
      >
        参加中
      </Button>
    );
  } else {
    return (
      <Button
        variant="raised"
        style={styles.button}
        onClick={() => {
          props.onJoin(props.user, props.tripId);
        }}
      >
        参加する
      </Button>
    );
  }
};

const renderRowMembers = (day, calendars, members, ok) => {
  return members.map(member => {
    var uc = calendars[member.uid];

    if (uc && uc.availableDays.includes(day.format("YYYYMMDD"))) {
      return <td style={styles.date(ok)}>○</td>;
    } else {
      return <td style={styles.date(ok)}>×</td>;
    }
  });
};

const check = (members, calendars, day, period) => {
  var res = true;
  for (let d of moment
    .range(day, moment(day).add("days", period - 1))
    .by("days")) {
    res &= members.every(member =>
      calendars[member.uid].availableDays.includes(d.format("YYYYMMDD"))
    );
  }

  return res;
};

const renderRows = (start, end, calendars, members, period) => {
  const res = [];
  var rest = 0;
  for (let day of moment.range(start, end).by("days")) {
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const weekday = weekdays[day.weekday()];
    const ok = check(members, calendars, day, period);
    if (ok) {
      rest = period;
    }
    const ok2 = rest-- > 0;
    res.push(
      <tr>
        <td style={styles.date(ok2)}>{day.format(`M月D日(${weekday})`)}</td>
        {renderRowMembers(day, calendars, members, ok2)}
      </tr>
    );
  }

  return res;
};

export const TripView = props => (
  <div style={styles.content}>
    <div>
      <Button
        variant="fab"
        color="primary"
        aria-label="close"
        onClick={props.onClose}
      >
        <NavigateBeforeIcon />
      </Button>
    </div>
    <div>
      <h1>{props.title}</h1>
    </div>
    <Card>
      <CardMedia
        image={props.image}
        title={props.title}
        style={styles.cardMedia}
      />
      <CardContent>
        <div style={styles.user}>
          <Avatar src={props.owner.icon} style={styles.avatar} />
          {props.owner.name}
        </div>
      </CardContent>
    </Card>

    <Card style={styles.card}>
      <h2>参加者({props.members.length}人)</h2>
      <JoinUnjoinButton
        isMember={isMember(props.user, props.members)}
        onJoin={props.onJoin}
        onUnjoin={props.onUnjoin}
        user={props.user}
        tripId={props.id}
      />
      <div style={styles.members}>
        {props.members.map(member => <TripMember member={member} />)}
      </div>
    </Card>

    <Card style={styles.card}>
      <h2>開催日程</h2>
      <div>
        期間：{props.startDate.format("YYYY年M月D日")}〜{props.endDate.format(
          "M月D日"
        )}
      </div>
      <div>日数：{props.period}日間</div>
      <hr />
      <table>
        <tr>
          <td />
          {props.members.map(member => (
            <td>
              <TripMember member={member} />
            </td>
          ))}
        </tr>
        {renderRows(
          props.startDate,
          props.endDate,
          props.calendars,
          props.members,
          props.period
        )}
      </table>
    </Card>
  </div>
);
