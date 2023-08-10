import React, { Component } from 'react';

export default class Settings extends Component {
  render() {
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Settings
                </a>
                <div className='ry_breadcrumbsdivider'>/</div>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Overview
                </a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Settings</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div
                data-current='Tab 1'
                data-easing='ease'
                data-duration-in={300}
                data-duration-out={100}
                className='ry_tabs-style1 w-tabs'
              >
                <div className='ry_tabsmenu-style1 w-tab-menu' role='tablist'>
                  <a
                    data-w-tab='Tab 1'
                    className='ry_tablink-style1 w-inline-block w-tab-link w--current'
                    id='w-tabs-0-data-w-tab-0'
                    href='#w-tabs-0-data-w-pane-0'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-0'
                    aria-selected='true'
                  >
                    <div>Profile Settings</div>
                  </a>
                  <a
                    data-w-tab='Tab 2'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-1'
                    href='#w-tabs-0-data-w-pane-1'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-1'
                    aria-selected='false'
                  >
                    <div>Workspace</div>
                  </a>
                  <a
                    data-w-tab='Tab 3'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-2'
                    href='#w-tabs-0-data-w-pane-2'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-2'
                    aria-selected='false'
                  >
                    <div>Features</div>
                  </a>
                  <a
                    data-w-tab='Tab 4'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-3'
                    href='#w-tabs-0-data-w-pane-3'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-3'
                    aria-selected='false'
                  >
                    <div>Screenshots</div>
                  </a>
                  <a
                    data-w-tab='Tab 5'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-4'
                    href='#w-tabs-0-data-w-pane-4'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-4'
                    aria-selected='false'
                  >
                    <div>Attendance</div>
                  </a>
                  <a
                    data-w-tab='Tab 6'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-5'
                    href='#w-tabs-0-data-w-pane-5'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-5'
                    aria-selected='false'
                  >
                    <div>Leave</div>
                  </a>
                  <a
                    data-w-tab='Tab 7'
                    className='ry_tablink-style1 w-inline-block w-tab-link'
                    tabIndex={-1}
                    id='w-tabs-0-data-w-tab-6'
                    href='#w-tabs-0-data-w-pane-6'
                    role='tab'
                    aria-controls='w-tabs-0-data-w-pane-6'
                    aria-selected='false'
                  >
                    <div>Tracker</div>
                  </a>
                </div>
                <div className='ry_tabscontent-style1 w-tab-content'>
                  <div
                    data-w-tab='Tab 1'
                    className='w-tab-pane w--tab-active'
                    id='w-tabs-0-data-w-pane-0'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-0'
                  >
                    <div className='ry_settingscard'>
                      <div
                        data-current='Tab 1'
                        data-easing='ease'
                        data-duration-in={300}
                        data-duration-out={100}
                        className='w-tabs'
                      >
                        <div className='ry_tabsmenu-style2 w-tab-menu' role='tablist'>
                          <a
                            data-w-tab='Tab 1'
                            className='ry_tablink-style2 w-inline-block w-tab-link w--current'
                            id='w-tabs-1-data-w-tab-0'
                            href='#w-tabs-1-data-w-pane-0'
                            role='tab'
                            aria-controls='w-tabs-1-data-w-pane-0'
                            aria-selected='true'
                          >
                            <div>General</div>
                          </a>
                          <a
                            data-w-tab='Tab 2'
                            className='ry_tablink-style2 w-inline-block w-tab-link'
                            tabIndex={-1}
                            id='w-tabs-1-data-w-tab-1'
                            href='#w-tabs-1-data-w-pane-1'
                            role='tab'
                            aria-controls='w-tabs-1-data-w-pane-1'
                            aria-selected='false'
                          >
                            <div>Manage Passwords</div>
                          </a>
                        </div>
                        <div className='w-tab-content'>
                          <div
                            data-w-tab='Tab 1'
                            className='w-tab-pane w--tab-active'
                            id='w-tabs-1-data-w-pane-0'
                            role='tabpanel'
                            aria-labelledby='w-tabs-1-data-w-tab-0'
                          >
                            <div className='w-form'>
                              <form
                                id='email-form-2'
                                name='email-form-2'
                                data-name='Email Form 2'
                                method='get'
                                aria-label='Email Form 2'
                              >
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
                                        Your Timezone
                                      </label>
                                      <div className='form-control'>
                                        <input
                                          type='text'
                                          className='ry_text-field-style1 w-input'
                                          maxLength={256}
                                          name='name-2'
                                          data-name='Name 2'
                                          placeholder='(UTC+00:00) UTC'
                                          id='name-2'
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='ry_formcol'>
                                    <div className='form-row'>
                                      <label htmlFor className='ry_field-label-style1'>
                                        API Token
                                      </label>
                                      <div className='form-control'>
                                        <div className='div-block-397'>
                                          <input
                                            type='text'
                                            className='ry_text-field-style1 w-input'
                                            maxLength={256}
                                            name='name-2'
                                            data-name='Name 2'
                                            placeholder
                                            id='name-2'
                                          />
                                          <a
                                            href='#'
                                            className='ry_small-btn-style1 bg-cyan w-button'
                                          >
                                            Generate
                                          </a>
                                        </div>
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
                                        Workspace Name
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
                              </form>
                              <div
                                className='w-form-done'
                                tabIndex={-1}
                                role='region'
                                aria-label='Email Form 2 success'
                              >
                                <div>Thank you! Your submission has been received!</div>
                              </div>
                              <div
                                className='w-form-fail'
                                tabIndex={-1}
                                role='region'
                                aria-label='Email Form 2 failure'
                              >
                                <div>Oops! Something went wrong while submitting the form.</div>
                              </div>
                            </div>
                          </div>
                          <div
                            data-w-tab='Tab 2'
                            className='w-tab-pane'
                            id='w-tabs-1-data-w-pane-1'
                            role='tabpanel'
                            aria-labelledby='w-tabs-1-data-w-tab-1'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-tab='Tab 2'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-1'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-1'
                  />
                  <div
                    data-w-tab='Tab 3'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-2'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-2'
                  />
                  <div
                    data-w-tab='Tab 4'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-3'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-3'
                  />
                  <div
                    data-w-tab='Tab 5'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-4'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-4'
                  />
                  <div
                    data-w-tab='Tab 6'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-5'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-5'
                  />
                  <div
                    data-w-tab='Tab 7'
                    className='w-tab-pane'
                    id='w-tabs-0-data-w-pane-6'
                    role='tabpanel'
                    aria-labelledby='w-tabs-0-data-w-tab-6'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
