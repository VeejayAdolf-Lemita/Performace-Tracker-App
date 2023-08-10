import React, { Component } from 'react';

export default class Attendance extends Component {
  render() {
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Reports
                </a>
                <div className='ry_breadcrumbsdivider'>/</div>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Attendance
                </a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Attendance</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='reports_top-card_container'>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Office Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>08:32h</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Active Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>07:14h</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>82%</h1>
                  </div>
                </div>
              </div>
              <div className='ry_bodycontainer flex-vertical'>
                <div className='ry_bodytop'>
                  <div className='ry_bodytop_left'>
                    <h1 className='ry_h2-display1'>Mon, May 29- Fri, Jun 3</h1>
                    <div className='ry_arrowdown'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg'
                        loading='lazy'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='ry_bodytop_right'>
                    <a href='#' className='ry_icon-btn-style1 light mr-10 w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset'
                      />
                      <div>Filter</div>
                    </a>
                    <a href='#' className='ry_icon-btn-style1 outline mr-10 w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset'
                      />
                      <div>Export</div>
                    </a>
                    <a href='#' className='ry_icon-btn-style1 light square w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset mr-0'
                      />
                    </a>
                  </div>
                </div>
                <div className='ry_bodycontainer'>
                  <div className='ry_tablecontainer'>
                    <div className='card_table'>
                      <div className='rb-table students'>
                        <div className='rb-table-hd'>
                          <div className='rb-table-col stretch'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Name</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Date</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Status</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Start Time</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Stop Time</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Duration</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Activity</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-content'>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Mon, May 29</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='ry_badge-style1'>Present</div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>74%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Tue, May 30</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='ry_badge-style1 bg-red'>Absent</div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>74%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Wed, May 31</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='ry_badge-style1'>Present</div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>74%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Thu, Jun 1</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='ry_badge-style1'>Present</div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>74%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Fri, Jun 2</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='ry_badge-style1'>Present</div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>08:32</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>74%</div>
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
        </div>
      </div>
    );
  }
}
