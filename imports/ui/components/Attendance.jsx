import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Attendances from '../../api/classes/client/attendance/Attendance';
import moment from 'moment';

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
    Attendances.getAttendance(this.state.rawDateFilter);
  }

  getAttendance = () => {
    if (this.state.rawDateFilter === '') {
      Attendances.getAttendance(this.state.rawDateFilter);
    } else {
      Attendances.clearDB();
      Attendances.getFilteredAttendance(this.state.rawDateFilter);
    }
  };

  handleDateChange = async (event) => {
    await this.setState({ rawDateFilter2: event.target.value });
    const formattedDate = await moment(event.target.value, 'YYYY-MM-DD').format(
      'YYYY-MM-DDTHH:mm:ss.SSSZ',
    );
    await this.setState({ rawDateFilter: formattedDate });
  };

  handleAttendanceFilter = () => {
    Attendances.clearDB();
    Attendances.getFilteredAttendance(this.state.rawDateFilter);
  };

  handleClearState = () => {
    this.setState({ rawDateFilter: '', rawDateFilter2: '' });
    Attendances.clearDB();
    Attendances.getFilteredAttendance(this.state.rawDateFilter);
  };

  handleExport = () => {
    const attendanceData = this.props.attendance;

    let csvContent = 'Name,Date,Status,Start Time,Stop Time,Duration,Activity,\n';
    attendanceData.forEach((data) => {
      const row = `${data.employeeName},${moment(data.date).format('ddd, MMM D')},${
        data.status
      },${moment.unix(data.timeIn).format('HH:mm')},${moment
        .unix(data.timeOut)
        .format('HH:mm')},${(() => {
        const durationInSeconds = moment.duration(data.duration, 'seconds').asSeconds();
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      })()},${data.activity}\n`;
      csvContent += row;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'attendance.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  calculateAverageOfficeTime = () => {
    const attendanceData = this.props.attendance;
    const totalOfficeTime = attendanceData.reduce((total, data) => {
      const { duration } = data;
      if (!isNaN(duration)) {
        return total + duration; // Assuming duration is in seconds
      }
      return total;
    }, 0);

    const averageOfficeTime = totalOfficeTime / attendanceData.length; // Calculate the average

    return averageOfficeTime;
  };

  calculateAverageProductivity = () => {
    const attendanceData = this.props.attendance;
    const totalProductivity = attendanceData.reduce((total, data) => {
      const { activity } = data;
      return total + parseFloat(activity);
    }, 0);

    const averageProductivity = totalProductivity / attendanceData.length; // Calculate the average

    return averageProductivity;
  };

  calculateAverageActivityTime = () => {
    const attendanceData = this.props.attendance;
    const totalActivityTime = attendanceData.reduce((total, data) => {
      const { duration, activity } = data;
      if (!isNaN(duration)) {
        const activityPercentage = parseFloat(activity) / 100;
        const activityTime = duration * activityPercentage;
        return total + activityTime;
      }
      return total;
    }, 0);

    const averageActivityTime = totalActivityTime / attendanceData.length; // Calculate the average

    return averageActivityTime;
  };

  render() {
    const { rawDateFilter2 } = this.state;
    console.log(this.props.attendance);

    const averageOfficeTime = this.calculateAverageOfficeTime();
    const averageProductivity = this.calculateAverageProductivity();
    const averageActivityTime = this.calculateAverageActivityTime();
    const sortedAttendance = this.props.attendance
      .slice()
      .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

    const formatDurationAsHHMM = (durationInSeconds) => {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      return `${hours.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}m`;
    };
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
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {isNaN(averageOfficeTime) ? 'N/A' : formatDurationAsHHMM(averageOfficeTime)}
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
                      {isNaN(averageActivityTime)
                        ? 'N/A'
                        : formatDurationAsHHMM(averageActivityTime)}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {isNaN(averageProductivity) ? 'N/A' : `${Math.round(averageProductivity)}%`}
                    </h1>
                  </div>
                </div>
              </div>
              <div className='ry_bodycontainer flex-vertical'>
                <div className='ry_bodytop'>
                  <div className='ry_bodytop_left' style={{ gap: '10px' }}>
                    <input
                      type='date'
                      className='ry_text-field-style1 w-input'
                      required
                      value={rawDateFilter2}
                      onChange={this.handleDateChange}
                      style={{ background: '#fff' }}
                    />
                    <button onClick={this.handleClearState}>Clear</button>
                  </div>
                  <div className='ry_bodytop_right'>
                    <div
                      className='ry_icon-btn-style1 light mr-10 w-inline-block'
                      onClick={this.handleAttendanceFilter}
                    >
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
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
                          {sortedAttendance.map((data) => (
                            <div className='rb-table-row' key={data._id}>
                              <div className='rb-table-col stretch'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.employeeName}</div>
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
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div
                                    className={`ry_badge-style1 ${
                                      data.status === 'Absent' ? 'bg-red' : ''
                                    }`}
                                  >
                                    {data.status}
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{moment.unix(data.timeIn).format('HH:mm')}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _15'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{moment.unix(data.timeOut).format('HH:mm')}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    {data.Duration === 'NaNh NaNm' ? null : (
                                      <div>
                                        {(() => {
                                          const durationInSeconds = moment
                                            .duration(data.duration, 'seconds')
                                            .asSeconds();
                                          const hours = Math.floor(durationInSeconds / 3600);
                                          const minutes = Math.floor(
                                            (durationInSeconds % 3600) / 60,
                                          );
                                          return `${hours.toString().padStart(2, '0')}:${minutes
                                            .toString()
                                            .padStart(2, '0')}`;
                                        })()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{`${data.activity} %`}</div>
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
                            onClick={this.getAttendance}
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
      // <></>
    );
  }
}

export default withTracker(() => {
  Attendances.initiateWatch('Attedance');
  return {
    attendance: Attendances.Data,
  };
})(Attendance);
