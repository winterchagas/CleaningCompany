import React, { Component } from 'react';
import Dashboard from "../containers/dashboard";
import Panel from "../containers/panel";

export default class App extends Component {
  render() {
    return (
      <div>
          <Dashboard/>
          <Panel/>
      </div>
    );
  }
}
