import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/login-registration.css';
import Client from '../../api/classes/client/Client';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from '../router/withRouter';

class Signup extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'Signup');
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    Accounts.createUser({ profile: { username }, email, password }, (err) => {
      if (err) {
        alert(err.reason);
      } else {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    });
  };

  render() {
    Client.initiateWatch('Signup');
    const { username, email, password } = this.state;
    return (
      <div className='ry_app-main-wrapper-style1'>
        <div className='ry_card_sign-in-style1_container'>
          <div className='ry_card_sign-in-style1'>
            <div className='form-block w-form'>
              <form name='email-form' onSubmit={this.handleSubmit}>
                <div className='ry_sign-in-header'>
                  <h3 className='ry_h1-display1'>Register</h3>
                  <p className='ry_sign-in-p-style1'>Please fill the detals and create account</p>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Full Name</label>
                  <div className='form-control'>
                    <input
                      type='text'
                      className='ry_text-field-style1 w-input'
                      maxLength={256}
                      name='username'
                      value={username}
                      placeholder='Name'
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
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
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Password</label>
                  <div className='form-control'>
                    <input
                      type='password'
                      className='ry_text-field-style1 w-input'
                      maxLength={256}
                      name='password'
                      value={password}
                      placeholder='Password'
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className='ry_btn-container'>
                  <button type='submit' className='ry_btn-style1 _w-100 w-button'>
                    Sign up
                  </button>
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
          <div className='div-block-2'>
            <p className='ry_sign-in-p-style1'>
              Already have an account?{' '}
              <Link to='/login' className='ry_span-link-style1'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <a href='#' className='logo_link-style1 w-inline-block'>
          <img
            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647ee69070fda82b7c14bbf4_signup_logo.svg'
            loading='lazy'
            alt=''
            className='image'
          />
        </a>
      </div>
    );
  }
}

export default withRouter(withTracker(() => {})(Signup));
