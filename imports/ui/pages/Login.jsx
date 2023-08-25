import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/login-registration.css';
import Client from '../../api/classes/client/Client';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from '../router/withRouter';

class Login extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'Login');
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    Client.loginWithPassword(email, password).catch((error) => alert(error));
  };

  render() {
    Client.initiateWatch('Login');
    const { email, password } = this.state;
    const { isLogin } = this.props;

    if (isLogin) {
      this.props.navigate('/');
    }

    return (
      <div className='ry_app-main-wrapper-style1'>
        <a href='#' className='logo_link-style1 w-inline-block'>
          <img
            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647ee69070fda82b7c14bbf4_signup_logo.svg'
            className='image'
          />
        </a>
        <div className='ry_card_sign-in-style1_container'>
          <div className='ry_card_sign-in-style1'>
            <div className='form-block w-form'>
              <form id='email-form' name='email-form' onSubmit={this.handleSubmit}>
                <div className='ry_sign-in-header'>
                  <h3 className='ry_h1-display1'>Welcome Back</h3>
                  <p className='ry_sign-in-p-style1'>
                    Enter your credential to access your account
                  </p>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Email</label>
                  <div className='form-control'>
                    <input
                      type='email'
                      className='ry_text-field-style1 w-input'
                      maxLength={256}
                      value={email}
                      name='email'
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
                <div className='div-block'>
                  <Link to='/reset-password' className='ry_link-style1'>
                    Forgot Password?
                  </Link>
                </div>
                <div className='ry_btn-container'>
                  <button type='submit' className='ry_btn-style1 _w-100 w-button'>
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className='div-block-2'>
            <p className='ry_sign-in-p-style1'>
              Don't have an account yet?{' '}
              <Link to='/sign-up' className='ry_span-link-style1'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  withTracker(() => {
    const isLogin = Client.User;

    return { isLogin };
  })(Login),
);
