import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ActivityLevels from '../../api/classes/client/activity-level/ActivityLevel';

class ActivityLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawDateFilter: '',
      rawDateFilter2: '',
    };
    ActivityLevels.setWatcher(this, 'ActivityLevel');
  }

  componentDidMount() {
    // ActivityLevels.getActivityLvl();
  }

  handleDateChange = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter: formattedDate, rawDateFilter: inputValue }); // Update both states
      console.log(formattedDate);
    }

    console.log(this.state.dateFilter);
  };

  handleDateChange2 = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter2: formattedDate, rawDateFilter2: inputValue }); // Update both states
      console.log(formattedDate);
    }

    console.log(this.state.dateFilter2);
  };

  handleActivityLevelFilter = () => {};

  render() {
    const { rawDateFilter, rawDateFilter2 } = this.state;
    console.log(this.props.activityLvl);
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Reports</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Activity Level</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Activity Level</h1>
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
                  <div className='ry_bodytop_left' style={{ gap: '10px' }}>
                    <label>From:</label>
                    <input
                      type='date'
                      className='ry_text-field-style1 w-input'
                      required
                      value={rawDateFilter}
                      onChange={this.handleDateChange}
                      style={{ background: '#fff' }}
                    />
                    <label>To:</label>
                    <input
                      type='date'
                      className='ry_text-field-style1 w-input'
                      required
                      value={rawDateFilter2}
                      onChange={this.handleDateChange2}
                      style={{ background: '#fff' }}
                    />
                  </div>
                  <div className='ry_bodytop_right'>
                    <div
                      className='ry_icon-btn-style1 light mr-10 w-inline-block'
                      onClick={this.handleActivityLevelFilter}
                    >
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                        className='icon-btn_asset'
                      />
                      <div>Filter</div>
                    </div>
                    <div className='ry_icon-btn-style1 outline mr-10 w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg'
                        className='icon-btn_asset'
                      />
                      <div>Export</div>
                    </div>
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
                                <div>Project</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Mon</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Tue</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Wed</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Thu</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Fri</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _10'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Average</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-content'>
                          <div className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='div-block-398'>
                                  <div className='ry_person-style2'>
                                    <img
                                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png'
                                      loading='lazy'
                                      alt=''
                                    />
                                  </div>
                                  <div className='table-text'>
                                    <div>John Smith</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>Graphic Design</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>77%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>84%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>65%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-yellow'>
                                  <div>59%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-yellow'>
                                  <div>53%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _10'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>72%</div>
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

export default withTracker(() => {
  ActivityLevels.initiateWatch('ActivityLevel');
  return {
    activityLvl: ActivityLevels.Data,
  };
})(ActivityLevel);
