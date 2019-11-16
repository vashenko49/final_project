import React, { Component } from 'react';

// Preloader from materialize library
export default class Preloader extends Component {
  render() {
    return (
      <div className="preloader-wrapper active ">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}
