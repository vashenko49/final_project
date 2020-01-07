import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div
        className="not-found"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '207px 0',
          fontWeight: '500'
        }}
      >
        <h2 style={{ fontSize: '100px' }}>404</h2>
        <p style={{ fontSize: '50px' }}>We can't find the page you are looking for.</p>
        <p style={{ fontSize: '50px' }}>Sorry for the inconvenience</p>
      </div>
    );
  }
}

export default NotFound;
