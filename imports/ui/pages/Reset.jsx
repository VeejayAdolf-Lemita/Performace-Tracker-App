import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/login-registration.css';
import Client from '../../api/classes/client/Client';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from '../router/withRouter';

class Reset extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'Reset');
    this.state = {
      email: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    Client.initiateWatch('Reset');
    const { email } = this.state;
    return (
      <div className='ry_app-main-wrapper-style1'>
        <div className='ry_card_sign-in-style1_container'>
          <div className='ry_card_sign-in-style1'>
            <div className='form-block w-form'>
              <form name='email-form'>
                <div className='ry_sign-in-header'>
                  <h3 className='ry_h1-display1'>Reset Password</h3>
                  <p className='ry_sign-in-p-style1'>
                    Enter the email associated with your account and we’ll send an email with
                    instructions to reset your password.
                  </p>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Email</label>
                  <div className='form-control'>
                    <input
                      type='email'
                      className='ry_text-field-style1 w-input'
                      maxLength={256}
                      name='email'
                      value={email}
                      placeholder='Email Address'
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className='ry_btn-container'>
                  <button className='ry_btn-style1 _w-100 w-button'>Send Instructions</button>
                </div>
                <div className='div-block-3'>
                  <Link to='/login' className='ry_link-style1 text-gray'>
                    Cancel
                  </Link>
                </div>
              </form>
              <div
                className='w-form-done'
                tabIndex={-1}
                role='region'
                aria-label='Email Form success'
              >
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div
                className='w-form-fail'
                tabIndex={-1}
                role='region'
                aria-label='Email Form failure'
              >
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withTracker(() => {})(Reset));
