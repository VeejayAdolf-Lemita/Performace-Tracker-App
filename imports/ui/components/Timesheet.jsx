import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Timesheets from '../../api/classes/client/timesheet/Timesheet';
import moment from 'moment';

function calculateTimeDifference(startTime, endTime) {
  const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
  const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

  let totalSeconds =
    (endHour - startHour) * 3600 + (endMinute - startMinute) * 60 + (endSecond - startSecond);

  if (totalSeconds < 0) {
    totalSeconds += 24 * 3600; // Add 24 hours (in seconds) to account for spanning across days
  }

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

class Timesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFilter: '',
      rawDateFilter: '',
    };
    Timesheets.setWatcher(this, 'Timesheet');
  }

  componentDidMount() {
    Timesheets.getTimesheet();
  }

  handleDateChange = async (event) => {
    this.setState({ rawDateFilter: event.target.value });
    const formattedDate = await moment(event.target.value, 'YYYY-MM-DD').format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ',
    );
    this.setState({ dateFilter: formattedDate });
  };

  handleTimeSheetFilter = () => {
    Timesheets.getFilteredTimesheet(`${this.state.dateFilter}`);
  };

  getTimesheet = () => {
    const { rawDateFilter } = this.state;
    if (rawDateFilter === '') {
      Timesheets.getTimesheet();
    } else {
      Timesheets.getFilteredTimesheet(`${this.state.dateFilter}`);
    }
  };

  handleExport = () => {
    const timesheetData = this.props.timesheet;

    let csvContent = 'Name,Team,Date,Office Time,Productivity,Earnings\n';
    timesheetData.forEach((data) => {
      const row = `${data.Name},${data.Team},${data.Date},"${data.OfficeTime}",${data.Productivity}%,${data.Earnings} $\n`;
      csvContent += row;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'timesheet.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  calculateTotalTimeDifference = (timesheetData) => {
    let totalSeconds = 0;

    timesheetData.forEach((data) => {
      const hours = Math.floor(data.officeTime / 3600);
      const minutes = Math.floor((data.officeTime % 3600) / 60);
      const seconds = data.officeTime % 60;
      totalSeconds += data.officeTime;
    });

    const averageSeconds = totalSeconds / timesheetData.length;

    const averageHours = Math.floor(averageSeconds / 3600);
    const averageMinutes = Math.floor((averageSeconds % 3600) / 60);
    const averageSecondsRemainder = Math.floor(averageSeconds % 60);

    return `${averageHours}:${String(averageMinutes).padStart(2, '0')}:${String(
      averageSecondsRemainder,
    ).padStart(2, '0')}`;
  };

  calculateTotalActiveTimeDifference = (timesheetData) => {
    let totalActiveSeconds = 0;

    timesheetData.forEach((data) => {
      const activityPercentage = data.activity / 100; // Convert activity percentage to a fraction
      const activeSeconds = data.officeTime * activityPercentage;
      totalActiveSeconds += activeSeconds;
    });

    const averageActiveSeconds = totalActiveSeconds / timesheetData.length;

    const averageHours = Math.floor(averageActiveSeconds / 3600);
    const averageMinutes = Math.floor((averageActiveSeconds % 3600) / 60);
    const averageSecondsRemainder = Math.floor(averageActiveSeconds % 60);

    return `${averageHours}:${String(averageMinutes).padStart(2, '0')}:${String(
      averageSecondsRemainder,
    ).padStart(2, '0')}`;
  };

  calculateAverageProductivity = (timesheetData) => {
    let totalProductivity = 0;

    timesheetData.forEach((data) => {
      totalProductivity += data.productivity; // Sum up productivity percentages
    });

    const averageProductivity = totalProductivity / timesheetData.length;
    return `${averageProductivity.toFixed(0)}%`; // Average productivity percentage
  };

  render() {
    const { rawDateFilter } = this.state;
    const averageOfficeTime = this.calculateTotalTimeDifference(this.props.timesheet);
    const averageActiveTime = this.calculateTotalActiveTimeDifference(this.props.timesheet);
    const averageProductivity = this.calculateAverageProductivity(this.props.timesheet);
    console.log(this.props.timesheet);
    const sortedTimesheet = this.props.timesheet
      .slice()
      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());
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
                  Timesheets
                </a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Timesheets</h1>
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
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {averageOfficeTime === 'NaN:NaN:NaN' ? 'N/A' : averageOfficeTime}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Active Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {averageActiveTime === 'NaN:NaN:NaN' ? 'N/A' : averageActiveTime}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {averageProductivity === 'NaN%' ? 'N/A' : averageProductivity}
                    </h1>
                  </div>
                </div>
              </div>
              <div className='ry_bodycontainer flex-vertical'>
                <div className='ry_bodytop'>
                  <div className='ry_bodytop_left'>
                    <div className='form-control'>
                      <input
                        type='date'
                        className='ry_text-field-style1 w-input'
                        required
                        value={rawDateFilter}
                        onChange={this.handleDateChange}
                        style={{ background: '#fff' }}
                      />
                    </div>
                  </div>
                  <div className='ry_bodytop_right'>
                    <div
                      className='ry_icon-btn-style1 light mr-10 w-inline-block'
                      onClick={this.handleTimeSheetFilter}
                    >
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset'
                      />
                      <div>Filter</div>
                    </div>
                    <div
                      className='ry_icon-btn-style1 outline mr-10 w-inline-block'
                      onClick={this.handleExport}
                    >
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg'
                        className='icon-btn_asset'
                        style={{}}
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
                                <div>Team</div>
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
                          <div className='rb-table-col _20'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Office Time</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Productivity</div>
                              </div>
                            </div>
                          </div>
                          <div className='rb-table-col _15'>
                            <div className='rb-table-cell'>
                              <div className='table-header-div'>
                                <div>Earnings ($)</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-content'>
                          {sortedTimesheet.map((data) => (
                            <div className='rb-table-row' key={data._id}>
                              <div className='rb-table-col stretch'>
                                <div className='rb-table-cell'>
                                  <div className='div-block-398'>
                                    <div className='ry_person-style2'>
                                      <img src={data.image} />
                                    </div>
                                    <div className='table-text'>
                                      <div>{data.employeeName}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.department}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{moment(data.date).format('ddd, MMM D')}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _20'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {calculateTimeDifference(
                                        '00:00:00',
                                        `${Math.floor(data.officeTime / 3600)}:${Math.floor(
                                          (data.officeTime % 3600) / 60,
                                        )}:${data.officeTime % 60}`,
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{`${data.productivity}%`}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{`${data.salary} $`}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          className='rb-table-content'
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <div
                            className='ry_icon-btn-style1 w-inline-block'
                            style={{ cursor: 'pointer' }}
                            onClick={this.getTimesheet}
                          >
                            Load Data
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
  Timesheets.setWatcher(this, 'Timesheet');
  return {
    timesheet: Timesheets.Data,
  };
})(Timesheet);
