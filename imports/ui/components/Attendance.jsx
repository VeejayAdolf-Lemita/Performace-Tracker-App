import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Attendances from '../../api/classes/client/attendance/Attendance';

function calculateTimeDuration(startTime, stopTime) {
  const start = new Date(`2000-01-01T${startTime}`);
  const stop = new Date(`2000-01-02T${stopTime}`);
  const durationMillis = stop - start;
  return durationMillis;
}

function calculateDurationString(durationMillis) {
  const durationHours = Math.floor(durationMillis / (60 * 60 * 1000));
  const durationMinutes = Math.floor((durationMillis % (60 * 60 * 1000)) / (60 * 1000));
  return `${durationHours}h ${durationMinutes}m`;
}

function calculateProductivityPercentage(activity) {
  const activityPercentage = parseFloat(activity);
  return Math.round(activityPercentage);
}

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawDateFilter: '',
      rawDateFilter2: '',
    };
    Attendances.setWatcher(this, 'Attedance');
  }

  componentDidMount() {
    Attendances.getAttendance(``, ``);
  }

  handleDateChange = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter: formattedDate, rawDateFilter: inputValue }); // Update both states
    }
  };

  handleDateChange2 = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter2: formattedDate, rawDateFilter2: inputValue }); // Update both states
    }
  };

  handleAttendanceFilter = () => {
    Attendances.getAttendance(`${this.state.dateFilter}`, `${this.state.dateFilter2}`);
  };

  handleExport = () => {
    const attendanceData = this.props.attendance;

    // Convert the data to a suitable format (e.g., CSV, JSON, Excel, etc.)
    // For demonstration purposes, we'll use CSV format
    let csvContent = 'Name,Date,Status,Start Time,Stop Time,Duration,Activity,\n';
    attendanceData.forEach((data) => {
      const row = `${data.Name},${data.Date},${data.Status},${data.StartTime},${data.StopTime},${data.Duration},${data.Activity}\n`;
      csvContent += row;
    });

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'attendance.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    const { rawDateFilter, rawDateFilter2 } = this.state;

    let totalOfficeTime = 0;
    let totalActiveTime = 0;
    let totalProductivity = 0;
    let validAttendanceCount = 0; // To keep track of valid attendance records

    this.props.attendance.forEach((data) => {
      if (data.Status !== 'Absent') {
        // Exclude "Absent" records
        validAttendanceCount++;

        const durationMillis = calculateTimeDuration(data.StartTime, data.StopTime);
        totalOfficeTime += durationMillis;

        if (data.ActiveTime && data.ActiveTime !== '0') {
          // Exclude "ActiveTime" of 0
          const activeDurationMillis = calculateTimeDuration('00:00:00', data.ActiveTime);
          totalActiveTime += activeDurationMillis;
        }

        totalProductivity += calculateProductivityPercentage(data.Activity);
      }
    });

    const averageOfficeTime =
      validAttendanceCount > 0
        ? calculateDurationString(totalOfficeTime / validAttendanceCount)
        : 'N/A';

    const averageActiveTime =
      validAttendanceCount > 0
        ? calculateDurationString(totalActiveTime / validAttendanceCount)
        : 'N/A';

    const averageProductivity =
      validAttendanceCount > 0 ? Math.round(totalProductivity / validAttendanceCount) : 'N/A';
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Reports</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Attendance</div>
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
                    <h1 className='ry_h3-display1 weight-semibold'>{averageOfficeTime}</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Active Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{averageActiveTime}</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{averageProductivity}%</h1>
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
                      onClick={this.handleAttendanceFilter}
                    >
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset'
                      />
                      <div>Filter</div>
                    </div>
                    <div className='ry_icon-btn-style1 outline mr-10 w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg'
                        className='icon-btn_asset'
                        onClick={this.handleExport}
                      />
                      <div>Export</div>
                    </div>
                    <div className='ry_icon-btn-style1 light square w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg'
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset mr-0'
                      />
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
                          {this.props.attendance.map((data) => (
                            <div className='rb-table-row' key={data._id}>
                              <div className='rb-table-col stretch'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Name}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Date}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div
                                    className={`ry_badge-style1 ${
                                      data.Status === 'Absent' ? 'bg-red' : ''
                                    }`}
                                  >
                                    {data.Status}
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.StartTime}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.StopTime}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    {data.Duration === 'NaNh NaNm' ? null : (
                                      <div>{data.Duration}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{`${data.Activity}`}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
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
  Attendances.initiateWatch('Attedance');
  return {
    attendance: Attendances.Data,
  };
})(Attendance);
