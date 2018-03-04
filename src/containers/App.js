import React, { Component } from "react";
import moment from "moment";

import { Header } from "../components/Header";
import { TripCard } from "../components/TripCard";
import { TripView } from "../components/TripView";
import { CalendarPage } from "./CalendarPage";
import { ChatPage } from "./ChatPage";

const users = {
  osa9: {
    uid: "osa9",
    name: "おさないん",
    icon: "/static/icons/osa9.jpg"
  },
  yamato: {
    uid: "yamato",
    name: "やまと",
    icon: "/static/icons/roadroller_da.jpg"
  },
  uetsu: {
    uid: "uetsu",
    name: "うえつ",
    icon: "/static/icons/uetsu.png"
  },
  y_f_: {
    uid: "y_f_",
    name: "わいえふ",
    icon: "/static/icons/y_f_.jpg"
  }
};

const trips = {
  kuiski2018: {
    id: "kuiski2018",
    image: "/static/images/kuiski2018.jpg",
    title: "毎年恒例！ くいすきー2018 スノーボードもあるよ",
    startDate: moment("2018/3/23"),
    owner: users.osa9,
    members: [users.osa9, users.yamato, users.uetsu],
    endDate: moment("2018/3/25"),
    days: "3"
  },
  kouti: {
    id: "kouti",
    image: "/static/images/kouti.png",
    title: "鰹＆よさこい祭り 高知堪能旅行",
    startDate: moment("2018/5/1"),
    owner: users.yamato,
    members: [users.yamato, users.y_f_],
    endDate: moment("2018/6/30"),
    days: "2"
  },
  aso: {
    id: "aso",
    image: "/static/images/aso.jpg",
    title: "阿蘇火振り祭り！",
    startDate: moment("2018/3/17"),
    owner: users.uetsu,
    members: [users.uetsu],
    endDate: moment("2018/3/18"),
    days: "2"
  },
  taiwan: {
    id: "taiwan",
    image: "/static/images/taiwan.jpg",
    title: "くいす台湾旅行！",
    startDate: moment("2018/5/1"),
    owner: users.yamato,
    members: [users.yamato, users.uetsu],
    endDate: moment("2018/9/30"),
    days: "3"
  },
  diving: {
    id: "diving",
    image: "/static/images/diving.jpg",
    title: "くいすんちゅ Cカード取得ツアー",
    startDate: moment("2018/5/1"),
    owner: users.osa9,
    members: [users.yamato, users.uetsu, users.y_f_],
    endDate: moment("2018/7/15"),
    days: "3"
  }
};

const generateCalendar = () => {
  const start = moment("2018/3/9");
  const end = moment("2018/8/31");
  var days = [];
  while (start < end) {
    const current = moment(start);
    if (current.date() % 2 === 0) days.push(current.format("YYYYMMDD"));
    days.push(current.add("days", 1).format("YYYYMMDD"));
    days.push(current.add("days", 1).format("YYYYMMDD"));

    start.add("days", 7);
  }

  return days;
};

const generateRandomCalendar = () => {
  const start = moment("2018/3/9");
  const end = moment("2018/8/31");
  var days = [];
  while (start < end) {
    const current = moment(start);
    if (Math.random() < 0.8) days.push(current.format("YYYYMMDD"));
    if (Math.random() < 0.95)
      days.push(current.add("days", 1).format("YYYYMMDD"));
    if (Math.random() < 0.95)
      days.push(current.add("days", 1).format("YYYYMMDD"));

    start.add("days", 7);
  }

  return days;
};

const calendars = {
  osa9: {
    availableDays: generateCalendar(),
    user: "osa9"
  },
  yamato: {
    availableDays: generateRandomCalendar(),
    user: "yamato"
  },
  uetsu: {
    availableDays: generateRandomCalendar(),
    user: "uetsu"
  },
  y_f_: {
    availableDays: generateRandomCalendar(),
    user: "y_f_"
  }
};

const initialState = {
  view: 0,
  trips: trips,
  users: users,
  calendars: calendars,
  selectedItem: undefined
};

const styles = {
  tripCards: {
    display: "flex"
  },
  app: {
    paddingTop: 50
  }
};

class App extends Component {
  constructor() {
    super();

    this.onSelect = this.onSelect.bind(this);
    this.state = initialState;
  }

  onSelect(id) {
    if (id) {
      this.setState({ selectedItem: id });
    } else {
      this.setState({ selectedItem: undefined });
    }
  }

  onTabChange(value) {
    this.setState({ view: value });
  }

  onJoin(user, tripId) {
    trips[tripId].members.push(user);

    this.setState({ trips: Object.assign({}, trips) });
  }

  onUnjoin(user, tripId) {
    const trip = trips[tripId];
    if (!trip) {
      return console.error("Unable to find trip");
    }

    trips[tripId].members = trips[tripId].members.filter(
      u => u.uid !== user.uid
    );
    this.setState({ trips: Object.assign({}, trips) });
  }

  updateDays(uid, days) {
    calendars[uid].availableDays = days;
    this.setState({ calendars: Object.assign({}, calendars) });
  }

  renderContent() {
    if (this.state.view === 1) {
      return (
        <CalendarPage
          user="osa9"
          availableDays={this.state.calendars.osa9.availableDays}
          updateDays={(uid, days) => this.updateDays(uid, days)}
        />
      );
    }
    if (this.state.view === 2) {
      return (
        <ChatPage />
      );
    }
    if (this.state.selectedItem) {
      const trip = trips[this.state.selectedItem];
      if (!trip) {
        return "Error";
      }

      return (
        <div>
          <TripView
            id={trip.id}
            key={trip.title}
            image={trip.image}
            title={trip.title}
            startDate={trip.startDate}
            endDate={trip.endDate}
            period={trip.days}
            owner={trip.owner}
            members={trip.members}
            onClose={() => this.onSelect(null)}
            onJoin={(user, tripId) => this.onJoin(user, tripId)}
            onUnjoin={(user, tripId) => this.onUnjoin(user, tripId)}
            user={users.osa9}
            calendars={this.state.calendars}
          />
        </div>
      );
    } else {
      return (
        <div>
          {Object.keys(trips).map(key => this.renderItem(trips[key]), this)}
        </div>
      );
    }
  }

  render() {
    return (
      <div style={styles.app}>
        <Header onChange={value => this.onTabChange(value)} />
        {this.renderContent()}
      </div>
    );
  }

  renderItem(item) {
    return (
      <TripCard
        key={item.title}
        image={item.image}
        title={item.title}
        startDate={item.startDate}
        owner={item.owner}
        endDate={item.endDate}
        period={item.days}
        members={item.members.length}
        onSelect={() => this.onSelect(item.id)}
      />
    );
  }
}

export default App;
