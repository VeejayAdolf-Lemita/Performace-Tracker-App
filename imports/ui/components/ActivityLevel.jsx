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

  handleDateChange = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter: formattedDate, rawDateFilter: inputValue }); // Update both states
      console.log(formattedDate);
    }
  };

  handleDateChange2 = (event) => {
    const inputValue = event.target.value;
    const [year, month, day] = inputValue.split('-'); // Assuming input value is in YYYY-MM-DD format

    if (year && month && day) {
      const formattedDate = `${month}/${day}/${year}`;
      this.setState({ dateFilter2: formattedDate, rawDateFilter2: inputValue }); // Update both states
      console.log(formattedDate);
    }
  };

  handleActivityLevelFilter = () => {
    ActivityLevels.getActivityLvl(`${this.state.dateFilter}`, `${this.state.dateFilter2}`);
  };

  handleExport = () => {
    const activityLvlData = this.props.activityLvl;

    // Convert the data to a suitable format (e.g., CSV, JSON, Excel, etc.)
    // For demonstration purposes, we'll use CSV format
    let csvContent = 'Name,Project,Mon,Tue,Wed,Thu,Fri,Average,\n';
    activityLvlData.forEach((data) => {
      const row = `${data.Name},${data.Department},${data.Mon},${data.Tue},${data.Wed},${data.Thu},${data.Fri},${data.AverageActivity},\n`;
      csvContent += row;
    });

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'activityLvlData.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    const { rawDateFilter, rawDateFilter2 } = this.state;
    const { activityLvl } = this.props;
    const numObjects = activityLvl.length;
    let totalActiveTimeInSeconds = 0;
    let totalProductivity = 0;
    let totalOfficeTimeInSeconds = 0;

    activityLvl.forEach((item) => {
      // Extract numerical values for AverageActiveTime, AverageProductivity, and OfficeTimeAverage
      const activeTime = item.AverageActiveTime; // The format is like "9.71h"
      const productivity = parseFloat(item.AverageProductivity);
      const officeTime = item.OfficeTimeAverage; // The format is like "5.285"

      // Convert activeTime to seconds and add to totalActiveTimeInSeconds
      const activeTimeParts = activeTime.split('.');
      const hours = parseInt(activeTimeParts[0]);
      const minutes = Math.round(parseFloat(`0.${activeTimeParts[1]}`) * 60);
      const totalSeconds = hours * 3600 + minutes * 60;
      if (!isNaN(totalSeconds)) {
        totalActiveTimeInSeconds += totalSeconds;
      }

      if (!isNaN(productivity)) {
        totalProductivity += productivity;
      }

      // Convert officeTime to seconds and add to totalOfficeTimeInSeconds
      const officeTimeParts = officeTime.split('.');
      const officeHours = parseInt(officeTimeParts[0]);
      const officeMinutes = Math.round(parseFloat(`0.${officeTimeParts[1]}`) * 60);
      const totalOfficeSeconds = officeHours * 3600 + officeMinutes * 60;
      if (!isNaN(totalOfficeSeconds)) {
        totalOfficeTimeInSeconds += totalOfficeSeconds;
      }
    });

    // Calculate averages
    const averageActiveTimeInSeconds = totalActiveTimeInSeconds / numObjects;
    const averageProductivity = totalProductivity / numObjects;
    const averageOfficeTimeInSeconds = totalOfficeTimeInSeconds / numObjects;

    // Convert averageActiveTimeInSeconds back to hh:mm:ss format
    const averageActiveHours = Math.floor(averageActiveTimeInSeconds / 3600);
    const averageActiveMinutes = Math.floor((averageActiveTimeInSeconds % 3600) / 60);
    const averageActiveSeconds = averageActiveTimeInSeconds % 60;
    const averageActiveTimeFormatted = `${averageActiveHours}:${averageActiveMinutes
      .toString()
      .padStart(2, '0')}:${averageActiveSeconds.toString().padStart(2, '0')}`;

    const averageOfficeHours = Math.floor(averageOfficeTimeInSeconds / 3600);
    const averageOfficeMinutes = Math.floor((averageOfficeTimeInSeconds % 3600) / 60);
    const averageOfficeTimeFormatted = `${averageOfficeHours
      .toString()
      .padStart(2, '0')}:${averageOfficeMinutes.toString().padStart(2, '0')}`;
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
                      <div className='ry_p-style1'>OfficeTimeAverage</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {averageOfficeTimeFormatted === 'NaN:NaN'
                        ? 'N/A'
                        : `${averageOfficeTimeFormatted}h`}
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
                      {averageActiveTimeFormatted === 'NaN:NaN:NaN'
                        ? 'N/A'
                        : `${averageActiveTimeFormatted}h`}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {averageProductivity === 'NaN%' ? 'N/A' : `${averageProductivity}%`}
                    </h1>
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
                          {this.props.activityLvl.map((data) => (
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
                                    <div>{data.Department}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{data.Mon}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{data.Tue}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{data.Wed}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-yellow'>
                                    <div>{data.Thu}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-yellow'>
                                    <div>{data.Fri}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text text-green'>
                                    <div>{data.AverageActivity}</div>
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
  ActivityLevels.initiateWatch('ActivityLevel');
  return {
    activityLvl: ActivityLevels.Data,
  };
})(ActivityLevel);
