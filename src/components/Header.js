import React, { Component } from "react";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Tabs, { Tab } from "material-ui/Tabs";

const styles = {};

const initialState = {
  value: 0
};

export class Header extends React.Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  constructor() {
    super();
    this.state = initialState;
  }

  onChange(value) {
    this.setState({ value: value });
    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    return (
      <AppBar>
        <Tabs
          value={this.state.value}
          onChange={(event, value) => this.onChange(value)}
        >
          <Tab label="旅行" />
          <Tab label="予定" />
          <Tab label="掲示板" />
        </Tabs>
      </AppBar>
    );
  }
}
