import React, { Component } from 'react';
// import '../stylesheets/notfound.css'

export default class Notfound extends Component {
  render() {
    return (
      <div className='utility-wrapper'>
        <div className='utility-container'>
          <div className='text-mono'>404</div>
          <div className='utility-content'>
            <h1>
              Page not found
              <br />
            </h1>
            <p>The page you are looking for doesn't exist or has been moved.</p>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
