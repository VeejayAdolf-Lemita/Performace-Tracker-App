import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Timelines from '../../api/classes/client/timeline/Timeline';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawDateFilter: '',
      rawDateFilter2: '',
    };
    Timelines.setWatcher(this, 'Timeline');
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

    console.log(this.state.dateFilter);
  };

  handleTimelinetFilter = () => {
    Timelines.getTimeline(`${this.state.dateFilter}`, `${this.state.dateFilter2}`);
  };

  handleExport = () => {
    const timelineData = this.props.timeline;

    // Convert the data to a suitable format (e.g., CSV, JSON, Excel, etc.)
    // For demonstration purposes, we'll use CSV format
    let csvContent = 'Name,Project,Mon,Tue,Wed,Thur,Fri,Total\n';
    timelineData.forEach((data) => {
      const row = `${data.Name},${data.Department},${data.Mon},${data.Tue},${data.Wed},${data.Thu},${data.Fri},${data.Total}\n`;
      csvContent += row;
    });

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'timeline.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    const { rawDateFilter, rawDateFilter2 } = this.state;
    console.log(this.props.timeline);
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
              {this.props.timeline.map((data) => (
                <div className='reports_top-card_container' key={data._id}>
                  <div className='card_dashboard_top _w-33 padding-20'>
                    <div className='card_dashboard_top-left justify-spacebetween'>
                      <div className='div-block-382'>
                        <div className='card_dashboard-label'>Office Time</div>
                        <div className='ry_p-style1'>Average per Shift</div>
                      </div>
                      <h1 className='ry_h3-display1 weight-semibold'>{data.OfficeTimeAverage}h</h1>
                    </div>
                  </div>
                  <div className='card_dashboard_top _w-33 padding-20'>
                    <div className='card_dashboard_top-left justify-spacebetween'>
                      <div className='div-block-382'>
                        <div className='card_dashboard-label'>Active Time</div>
                        <div className='ry_p-style1'>Average per Shift</div>
                      </div>
                      <h1 className='ry_h3-display1 weight-semibold'>{data.ActiveTimeAverage}h</h1>
                    </div>
                  </div>
                  <div className='card_dashboard_top _w-33 padding-20'>
                    <div className='card_dashboard_top-left justify-spacebetween'>
                      <div className='div-block-382'>
                        <div className='card_dashboard-label'>Productivity</div>
                      </div>
                      <h1 className='ry_h3-display1 weight-semibold'>{`${data.Productivity} %`}</h1>
                    </div>
                  </div>
                </div>
              ))}
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
                                      <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png' />
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
                                    <div>{data.Mon}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Tue}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Wed}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Thu}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Fri}</div>
                                  </div>
                                </div>
                              </div>
                              <div className='rb-table-col _10'>
                                <div className='rb-table-cell'>
                                  <div className='table-text'>
                                    <div>{data.Total}</div>
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
