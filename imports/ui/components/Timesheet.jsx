import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Timesheets from '../../api/classes/client/timesheet/Timesheet';

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

function calculateTimeDifferenceFromSeconds(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${hours}:${minutes}:${remainingSeconds}`;
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

  handleDateChange = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter: formattedDate, rawDateFilter: inputValue }); // Update both states
    }
  };

  handleTimeSheetFilter = () => {
    Timesheets.getTimesheet(`${this.state.dateFilter}`);
  };

  handleExport = () => {
    const timesheetData = this.props.timesheet;

    // Convert the data to a suitable format (e.g., CSV, JSON, Excel, etc.)
    // For demonstration purposes, we'll use CSV format
    let csvContent = 'Name,Team,Date,Office Time,Productivity,Earnings\n';
    timesheetData.forEach((data) => {
      const row = `${data.Name},${data.Team},${data.Date},"${data.OfficeTime}",${data.Productivity}%,${data.Earnings} $\n`;
      csvContent += row;
    });

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'timesheet.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    let totalOfficeTimeInSeconds = 0;
    let shiftCount = 0;

    this.props.timesheet.forEach((data) => {
      const [startTime, endTime] = data.OfficeTime.split(' - ');
      const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
      const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

      let effectiveOfficeTimeInSeconds =
        (endHour - startHour) * 3600 + (endMinute - startMinute) * 60 + (endSecond - startSecond);

      if (effectiveOfficeTimeInSeconds < 0) {
        effectiveOfficeTimeInSeconds += 24 * 3600; // Add 24 hours (in seconds) to account for spanning across days
      }

      totalOfficeTimeInSeconds += effectiveOfficeTimeInSeconds;
      shiftCount++;
    });

    const averageOfficeTimeInSeconds = totalOfficeTimeInSeconds / shiftCount;
    const averageOfficeTime = calculateTimeDifferenceFromSeconds(averageOfficeTimeInSeconds);

    let totalActiveTimeInSeconds = 0; // Initialize total active time

    this.props.timesheet.forEach((data) => {
      const activeTime = data.ActiveTime; // Get active time for this entry

      if (activeTime) {
        const [startHour, startMinute, startSecond] = activeTime.split(':').map(Number);
        const activeTimeInSeconds = startHour * 3600 + startMinute * 60 + startSecond;

        totalActiveTimeInSeconds += activeTimeInSeconds;
        shiftCount++;
      }
    });

    const averageActiveTimeInSeconds = shiftCount > 0 ? totalActiveTimeInSeconds / shiftCount : 0;
    const averageActiveTime = calculateTimeDifferenceFromSeconds(averageActiveTimeInSeconds);
    let totalProductivity = 0; // Initialize total productivity

    this.props.timesheet.forEach((data) => {
      const productivity = data.Productivity; // Get productivity for this entry

      if (productivity) {
        totalProductivity += parseInt(productivity); // Accumulate total productivity
      }
    });

    const averageProductivity =
      shiftCount > 0 ? Math.round(totalProductivity / shiftCount) + '%' : '0%';
    const { rawDateFilter } = this.state;
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
                    <h1 className='ry_h3-display1 weight-semibold'>{averageOfficeTime}h</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Active Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{averageActiveTime}h</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{averageProductivity}</h1>
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
                          {this.props.timesheet.map((data) => {
                            const [startTime, endTime] = data.OfficeTime.split(' - ');

                            const effectiveOfficeTime = calculateTimeDifference(startTime, endTime);
                            return (
                              <div className='rb-table-row' key={data._id}>
                                <div className='rb-table-col stretch'>
                                  <div className='rb-table-cell'>
                                    <div className='div-block-398'>
                                      <div className='ry_person-style2'>
                                        <img src={data.image} />
                                      </div>
                                      <div className='table-text'>
                                        <div>{data.Name}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col _15'>
                                  <div className='rb-table-cell'>
                                    <div className='table-text'>
                                      <div>{data.Team}</div>
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
                                <div className='rb-table-col _20'>
                                  <div className='rb-table-cell'>
                                    <div className='table-text'>
                                      <div>{effectiveOfficeTime}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col _15'>
                                  <div className='rb-table-cell'>
                                    <div className='table-text text-green'>
                                      <div>{`${data.Productivity}%`}</div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col _15'>
                                  <div className='rb-table-cell'>
                                    <div className='table-text'>
                                      <div>{`${data.Earnings} $`}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
