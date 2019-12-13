import React, { Component } from 'react';
import ProfileTabs from "./ProfileTabs";
import "./ProfilePage.scss";

export default class ProfilePage extends Component {
  render() {
    return (
      <section className="container">
        <h1 className="profile-header">My profile</h1>
        <ProfileTabs/>
      </section>
    );
  }
}
