import React from "react";
import { Calendar } from "../components/Calendar";

const initialState = {
  startMonth: [2018, 3],
  today: [2018, 3, 3]
};

export class CalendarPage extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return (
      <div>
        <Calendar
          availableDays={this.props.availableDays}
          updateDays={days => this.props.updateDays(this.props.user, days)}
          startDate={this.state.startMonth}
        />
      </div>
    );
  }
}
