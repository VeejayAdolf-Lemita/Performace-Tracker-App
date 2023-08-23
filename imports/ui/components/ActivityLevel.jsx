import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ActivityLevels from '../../api/classes/client/activity-level/ActivityLevel';
import moment from 'moment';
class ActivityLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawDateFilter: '',
      rawDateFilter2: '',
      gte: '',
      lte: '',
    };
    ActivityLevels.setWatcher(this, 'ActivityLevel');
  }

  handleDateChange = async (event) => {
    this.setState({ rawDateFilter: event.target.value });
    const gte = await moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    this.setState({ gte: gte });
  };

  handleDateChange2 = async (event) => {
    this.setState({ rawDateFilter2: event.target.value });
    const lte = await moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    this.setState({ lte: lte });
  };

  handleActivityLevelFilter = () => {
    ActivityLevels.getActivityLvl(this.state.gte, this.state.lte);
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

    console.log(this.props.activityLvl);
    const activityLvlData = this.props.activityLvl;
    const avgProductivityValues = activityLvlData.map((data) => parseInt(data.avgProductivity, 10)); // Convert to integers
    const totalAvgProductivity = avgProductivityValues.reduce((sum, value) => sum + value, 0);
    const averageProductivity = totalAvgProductivity / avgProductivityValues.length;

    // Round off the averageProductivity to a whole number
    const roundedAverageProductivity = Math.round(averageProductivity);

    // Calculate average office time

    const avgOfficeTimeValues = activityLvlData.map((data) => parseInt(data.avgOfficeTime, 10)); // Convert to integers
    const totalAvgOfficeTime = avgOfficeTimeValues.reduce((sum, value) => sum + value, 0);
    const averageOfficeTimeInSeconds = totalAvgOfficeTime / avgOfficeTimeValues.length;

    // Convert seconds to hh:mm:ss format
    const hours = Math.floor(averageOfficeTimeInSeconds / 3600);
    const minutes = Math.floor((averageOfficeTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(averageOfficeTimeInSeconds % 60);

    // Format the time values
    const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    const avgActivityTimeValues = activityLvlData.map((data) => parseInt(data.avgActivityTime, 10)); // Convert to integers
    const totalAvgActivityTime = avgActivityTimeValues.reduce((sum, value) => sum + value, 0);
    const averageActivityTime = totalAvgActivityTime / avgActivityTimeValues.length;

    const avgHours = Math.floor(averageActivityTime / 3600);
    const avgMinutes = Math.floor((averageActivityTime % 3600) / 60);
    const avgSeconds = Math.floor(averageActivityTime % 60);

    const formattedAvgHours = avgHours < 10 ? `0${avgHours}` : avgHours.toString();
    const formattedAvgMinutes = avgMinutes < 10 ? `0${avgMinutes}` : avgMinutes.toString();
    const formattedAvgSeconds = avgSeconds < 10 ? `0${avgSeconds}` : avgSeconds.toString();

    const formattedAvgActivityTime = `${formattedAvgHours}:${formattedAvgMinutes}:${formattedAvgSeconds}`;

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
                      {formattedTime !== 'NaN:NaN:NaN' ? formattedTime : 'N/A'}
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
                      {formattedAvgActivityTime !== 'NaN:NaN:NaN'
                        ? formattedAvgActivityTime
                        : 'N/A'}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {isNaN(roundedAverageProductivity)
                        ? 'N/A'
                        : `${roundedAverageProductivity} %`}
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
                                    <div>{`${data.AverageActivity} %`}</div>
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
