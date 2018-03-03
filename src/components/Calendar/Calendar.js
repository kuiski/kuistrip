import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Moment from "moment";
import { extendMoment } from "moment-range";
import * as colors from "material-ui/colors";

import { styles } from "./styles";

const moment = extendMoment(Moment);

const weekdays = ["", "月", "火", "水", "木", "金", "土", "日"];

const startDate = () => {
  return moment("2018/2/26");
};

const endDate = () => {
  return startDate().add("months", 6);
};

const dayString = day => {
  if (day.date() == 1) {
    return day.format("M/D");
  }

  return day.format("D");
};

const CalendarRecord = Immutable.Record({
  user: null,
  availableDays: Immutable.Set()
});

class CalendarState extends CalendarRecord {
  constructor(days = []) {
    super({ availableDays: Immutable.Set(days) });
  }

  toggleAvailableDay(day) {
    if (this.availableDays.has(day)) {
      return this.update("availableDays", ad => ad.delete(day));
    } else {
      return this.update("availableDays", ad => ad.add(day));
    }
  }
}

export default class Caldendar extends React.Component {
  static propTypes = {
    updateDays: PropTypes.func
  };

  static defaultProps = {
    updateDays: days => {}
  };

  constructor() {
    super();
    this.state = { calendar: new CalendarState() };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.setState({ calendar: new CalendarState(this.props.availableDays) });
  }

  isAvailable(day) {
    const dayString = day.format("YYYYMMDD");
    return this.state.calendar.availableDays.has(dayString);
  }

  onClick(day) {
    const dayString = day.format("YYYYMMDD");

    const newDays = this.state.calendar.toggleAvailableDay(dayString);

    this.setState({
      calendar: newDays
    });

    this.props.updateDays(newDays.availableDays.toJS());
  }

  weekdays() {
    return (
      <ul style={styles.grid}>
        {weekdays.map(weekday => <li style={styles.weekday}>{weekday}</li>)}
      </ul>
    );
  }

  days() {
    var days = [];
    for (let day of moment.range(startDate(), endDate()).by("days")) {
      // 月が替わる週には先頭に月を入れる
      if (day.weekday() === 1) {
        const weekend = moment(day).add("days", 7);

        if (!day.isSame(weekend, "month"))
          days.push(<li style={styles.month}>{weekend.format("YYYY/MM")}</li>);
        else days.push(<li style={styles.month} />);
      }

      const color = this.isAvailable(day) ? colors.pink[400] : undefined;

      days.push(
        <li
          style={styles.monthColor(day.month())}
          onClick={() => this.onClick(day)}
        >
          <div style={styles.selector(color)}>{dayString(day)}</div>
        </li>
      );
    }

    return <ul style={styles.grid}>{days}</ul>;
  }

  render() {
    return (
      <div>
        {this.weekdays()}
        {this.days()}
      </div>
    );
  }
}
