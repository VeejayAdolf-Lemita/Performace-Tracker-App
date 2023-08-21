import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
    };
    Client.setWatcher(this, 'Settings');
  }

  handleEditProfile = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+~<>?/{}[\]]{8,}$/;

    // Check if any required field is empty
    if (!password.trim() && confirmPassword.trim()) {
      alert('Please fill up all required fields.');
      return;
    }

    if (password === confirmPassword) {
      if (!passwordRegex.test(password)) {
        alert(
          'Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number',
        );
      } else {
        Client.users.update(
          { _id: `${this.props.Client._id}` },
          {
            $set: {
              services: {
                password: password,
              },
            },
          },
        );
        alert('Changes are already submitted');
        this.setState({
          password: '',
          confirmPassword: '',
        });
      }
    } else {
      alert("Password don't match");
      return;
    }
  };

  render() {
    console.log(this.state.fullName);
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Settings</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Overview</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Settings</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_tabs-style1 w-tabs'>
                <div className='ry_tabsmenu-style1 w-tab-menu' role='tablist'>
                  <div className='ry_tablink-style1 w-inline-block w-tab-link w--current'>
                    <div>Profile Settings</div>
                  </div>
                </div>
                <div className='ry_tabscontent-style1 w-tab-content'>
                  <div className='w-tab-pane w--tab-active'>
                    <div className='ry_settingscard'>
                      <div className='w-tabs'>
                        <div className='ry_tabsmenu-style2 w-tab-menu' role='tablist'>
                          <Link
                            to='/settings-profile'
                            className='ry_tablink-style2 w-inline-block w-tab-link'
                          >
                            <div>General</div>
                          </Link>
                          <Link
                            to='/settings-password'
                            className='ry_tablink-style2 w-inline-block w-tab-link w--current'
                          >
                            <div>Manage Passwords</div>
                          </Link>
                        </div>
                        <div className='w-tab-content'>
                          <div className='w-tab-pane w--tab-active'>
                            <div className='w-form'>
                              <form>
                                <div className='ry_formrow'>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label className='ry_field-label-style1'>New Password</label>
                                      <div className='form-control'>
                                        <input
                                          type='password'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          value={this.state.password}
                                          onChange={(e) =>
                                            this.setState({ password: e.target.value })
                                          }
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label className='ry_field-label-style1'>
                                        Confirm Password
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='password'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          value={this.state.confirmPassword}
                                          onChange={(e) =>
                                            this.setState({ confirmPassword: e.target.value })
                                          }
                                          required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                  }}
                                >
                                  <div
                                    className='ry_icon-btn-style1 w-inline-block'
                                    style={{ width: '200px' }}
                                    onClick={this.handleEditProfile}
                                  >
                                    <div>Submit Changes</div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Client.initiateWatch('Settings');
  return {
    isReady: Client.init(),
    Client: Client.user(),
  };
})(Settings);
