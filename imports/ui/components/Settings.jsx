import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
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
                          <div className='ry_tablink-style2 w-inline-block w-tab-link w--current'>
                            <div>General</div>
                          </div>
                          <div className='ry_tablink-style2 w-inline-block w-tab-link'>
                            <div>Manage Passwords</div>
                          </div>
                        </div>
                        <div className='w-tab-content'>
                          <div className='w-tab-pane w--tab-active'>
                            <div className='w-form'>
                              <form>
                                <div className='ry_formrow'>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        Full Name
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          name='name-2'
                                          data-name='Name 2'
                                          placeholder
                                          id='name-2'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        Last Name
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          name='name-2'
                                          data-name='Name 2'
                                          placeholder
                                          id='name-2'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='ry_formrow'>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        Email
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          name='name-2'
                                          data-name='Name 2'
                                          placeholder
                                          id='name-2'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        Birthday
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          name='name-2'
                                          data-name='Name 2'
                                          placeholder
                                          id='name-2'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='ry_formrow'>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        Your Timezone
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          placeholder='(UTC+00:00) UTC'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label className='ry_field-label-style1'>{`Edit Profile`}</label>
                                      <div className='form-control'>
                                        <button>Submit Changes</button>
                                      </div>
                                    </div>
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
