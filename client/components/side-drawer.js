import React from 'react';

import UserProfile from './user-profile.js';

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    console.log('logging out');
  }
  render() {
    return (
      <div className="side-drawer" align="center">
        <a className="waves-effect waves-light btn red lighten-1" onClick={this.handleLogOut}>Log Out</a>
        <UserProfile />
      </div>
    );
  }
}

export default SideDrawer;
