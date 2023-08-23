import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Timelines from '../../api/classes/client/timeline/Timeline';
import moment from 'moment';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawDateFilter: '',
      rawDateFilter2: '',
      gte: '',
      lte: '',
    };
    Timelines.setWatcher(this, 'Timeline');
  }

  handleDateChange = async (event) => {
    this.setState({ rawDateFilter: event.target.value });
    const gte = moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    await this.setState({ gte: gte });
  };

  handleDateChange2 = async (event) => {
    this.setState({ rawDateFilter2: event.target.value });
    const lte = moment(event.target.value, 'YYYY-MM-DD').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    await this.setState({ lte: lte });
  };

  handleTimelinetFilter = () => {
    Timelines.getTimeline(this.state.gte, this.state.lte);
  };

  handleExport = () => {
    const timelineData = this.props.timeline;
    let csvContent = 'Name,Project,Mon,Tue,Wed,Thur,Fri,Total\n';
    timelineData.forEach((data) => {
      const row = `${data.Name},${data.Department},${data.Mon},${data.Tue},${data.Wed},${data.Thu},${data.Fri},${data.Total}\n`;
      csvContent += row;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'timeline.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  calculateTotalOfficeTime(data) {
    const officeTimeValues = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    let totalOfficeTime = 0;

    for (const day of officeTimeValues) {
      if (data[day] !== '-') {
        totalOfficeTime += data[day];
      }
    }

    return totalOfficeTime;
  }

  calculateAverage(dataArray, field) {
    const validData = dataArray.filter((data) => data[field] !== '-');
    const total = validData.reduce((sum, data) => sum + data[field], 0);
    return validData.length > 0 ? total / validData.length : 0;
  }

  calculateAverageActivity(dataArray) {
    const validData = dataArray.filter((data) => data.activity !== '-');
    const totalActivityTime = validData.reduce((sum, data) => sum + data.activity, 0);
    const averageInSeconds = validData.length > 0 ? totalActivityTime / validData.length : 0;

    // Convert average activity time in seconds to HH:mm:ss format
    const hours = Math.floor(averageInSeconds / 3600);
    const minutes = Math.floor((averageInSeconds % 3600) / 60);
    const seconds = Math.floor(averageInSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  render() {
    const { rawDateFilter, rawDateFilter2 } = this.state;
    console.log(this.props.timeline);
    let totalOfficeTimeSum = 0;
    let totalValidDays = 0;

    this.props.timeline.forEach((data) => {
      const totalOfficeTime = this.calculateTotalOfficeTime(data);
      totalOfficeTimeSum += totalOfficeTime;

      // Count only if there is at least one valid day
      if (totalOfficeTime > 0) {
        totalValidDays++;
      }
    });

    const averageOfficeTime = totalValidDays > 0 ? totalOfficeTimeSum / totalValidDays : 0;
    const averageProductivity = this.calculateAverage(this.props.timeline, 'productivity');
    const averageActivityTime = this.calculateAverageActivity(this.props.timeline);
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Reports</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Timeline</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Timeline</h1>
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
                      {isNaN(averageOfficeTime)
                        ? 'N/A'
                        : moment.utc(averageOfficeTime * 1000).format('HH:mm:ss')}
                    </h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Active Time</div>
                      <div className='ry_p-style1'>Average per Shift</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{averageActivityTime}</h1>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33 padding-20'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Productivity</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {' '}
                      {isNaN(averageProductivity) ? 'N/A' : `${averageProductivity.toFixed(0)} %`}
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
                      onClick={this.handleTimelinetFilter}
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
                                <div>Total</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.props.timeline.map((data) => (
                          <div className='rb-table-content' key={data._id}>
                            <div className='rb-table-row'>
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
                                  <div className='table-text'>
                                    <div>
                                      {data.Mon !== '-'
                                        ? moment.utc(data.Mon * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {data.Tue !== '-'
                                        ? moment.utc(data.Tue * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {data.Wed !== '-'
                                        ? moment.utc(data.Wed * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {data.Thu !== '-'
                                        ? moment.utc(data.Thu * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {data.Fri !== '-'
                                        ? moment.utc(data.Fri * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>
                                      {data.Total !== '-'
                                        ? moment.utc(data.Total * 1000).format('HH:mm:ss')
                                        : '-'}
                                    </div>
                                  </div>
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
    );
  }
}

export default withTracker(() => {
  Timelines.setWatcher(this, 'Timeline');
  return {
    timeline: Timelines.Data,
  };
})(Timeline);
