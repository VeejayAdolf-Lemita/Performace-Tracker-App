import React, { Component } from 'react';
import RadarCharts from '../components/charts/RadarChart';
import VerticalChart from './charts/VerticalChart';
import { withTracker } from 'meteor/react-meteor-data';
import Feedbacks from '../../api/classes/client/feedback/Feedback';
import Client from '../../api/classes/client/Client';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackFilter: '',
    };
    Client.setWatcher(this, 'Feedback');
    Feedbacks.setWatcher(this, 'Feedback');
  }

  componentDidMount() {
    Feedbacks.getFeedback(`${this.props.Client.profile.username}`);
  }

  handleFeedback = (event) => {
    this.setState({ feedbackFilter: event.target.value });
  };

  handleFeedbackFilter = () => {
    Feedbacks.getFeedback(`${this.state.feedbackFilter}`);
    this.setState({ feedbackFilter: '' });
  };

  handleExport = () => {
    const feedbackData = this.props.feedback[0].data;

    // Convert the data to a suitable format (e.g., CSV, JSON, Excel, etc.)
    // For demonstration purposes, we'll use CSV format
    let csvContent = ',Result,Comparison,Gap,\n';
    feedbackData.forEach((data) => {
      const row = `${data.subject},${data.result},${data.comparison},${data.gap},\n`;
      csvContent += row;
    });

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'feedback.csv';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  render() {
    console.log(this.props.feedback.map((data) => data.data));

    if (!this.props.feedback) {
      return (
        <>
          <h1>No data found</h1>
          <button onClick={() => window.location.reload()}>Reload</button>
        </>
      );
    }
    return (
      <div className='ry_main-style1'>
        {this.props.feedback.map((data) => (
          <div className='ry_main-style1_container' key={data._id}>
            <div className='section-style1 mt-0'>
              <div className='ry_dashboard_top mb-10'>
                <div className='ry_breadcrumbs_container mb-0'>
                  <div className='ry_breadcrumbs-style1'>Dashboard</div>
                  <div className='ry_breadcrumbsdivider'>/</div>
                  <div className='ry_breadcrumbs-style1'>Overview</div>
                </div>
                <div className='ry_headercontainer'>
                  <h1 className='ry_h1-display1 text-white'>360° Feedback</h1>
                </div>
              </div>
              <div className='ry_body pb-0'>
                <div className='ry_bodytop'>
                  <div className='ry_bodytop_left'>
                    <h1 className='ry_h2-display1 mr-10'>Results</h1>
                  </div>
                  <div className='ry_bodytop_right'>
                    <input
                      type='text'
                      style={{
                        height: '30px',
                        marginRight: '1rem',
                        border: '0',
                        width: '230px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 9px rgba(0, 0, 0, 0.2)',
                        padding: '0 4px',
                      }}
                      value={this.state.feedbackFilter}
                      onChange={this.handleFeedback}
                      placeholder='Enter a name for other feedback'
                    />
                    <div
                      className='ry_icon-btn-style1 light mr-10 w-inline-block'
                      onClick={this.handleFeedbackFilter}
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
                  <div className='ry_bodycontainer_left'>
                    <div className='ry_review flex-vertical'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Reviewee Notes</div>
                      </div>
                      <div className='ry_cardbody'>
                        <p className='ry_p-style1'>{data.reviewNote}</p>
                      </div>
                    </div>
                    <div className='ry_review flex-vertical'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Summary</div>
                      </div>
                      <div className='ry_barchart'>
                        <RadarCharts data={data.data} />
                        <div>
                          <div className='ry_tablecontainer'>
                            <div className='rb-table students'>
                              <div className='rb-table-hd'>
                                <div className='rb-table-col '>
                                  <div className='rb-table-cell'>
                                    <div className='table-header-div'>
                                      <div style={{ minWidth: '140px' }}></div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col '>
                                  <div className='rb-table-cell'>
                                    <div className='table-header-div'>
                                      <div>Result</div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col'>
                                  <div className='rb-table-cell'>
                                    <div className='table-header-div'>
                                      <div>Comparison</div>
                                    </div>
                                  </div>
                                </div>
                                <div className='rb-table-col '>
                                  <div className='rb-table-cell'>
                                    <div className='table-header-div'>
                                      <div>Gap</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {data.data.map((feedback, index) => (
                                <div
                                  className='rb-table-content'
                                  key={index}
                                  style={{
                                    borderTop:
                                      feedback.subject === 'Total'
                                        ? '1px solid rgb(0 0 0 / 9%)'
                                        : 'none',
                                  }}
                                >
                                  <div className='rb-table-row'>
                                    <div className='rb-table-col '>
                                      <div
                                        className='rb-table-cell'
                                        style={{ justifyContent: 'center', minWidth: '140px' }}
                                      >
                                        <div className='div-block-398'>
                                          <div className='table-text'>
                                            <div
                                              style={{
                                                fontWeight:
                                                  feedback.subject === 'Total' ? 'bold' : 'light',
                                              }}
                                            >
                                              {feedback.subject}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='rb-table-col '>
                                      <div
                                        className='rb-table-cell'
                                        style={{ justifyContent: 'center' }}
                                      >
                                        <div className='table-text'>
                                          <div
                                            style={{
                                              fontWeight:
                                                feedback.subject === 'Total' ? 'bold' : 'light',
                                            }}
                                          >
                                            {feedback.result}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='rb-table-col '>
                                      <div
                                        className='rb-table-cell'
                                        style={{ justifyContent: 'center' }}
                                      >
                                        <div className='table-text'>
                                          <div
                                            style={{
                                              fontWeight:
                                                feedback.subject === 'Total' ? 'bold' : 'light',
                                            }}
                                          >
                                            {feedback.comparison}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='rb-table-col '>
                                      <div
                                        className='rb-table-cell'
                                        style={{ justifyContent: 'center' }}
                                      >
                                        <div className='table-text text-green'>
                                          <div
                                            style={{
                                              fontWeight:
                                                feedback.subject === 'Total' ? 'bold' : 'light',
                                            }}
                                          >
                                            {feedback.gap}
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
                    <div className='ry_review flex-vertical'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Communication</div>
                      </div>
                      <div className='ry_barchart'>
                        <VerticalChart data={data.communication} />
                      </div>
                    </div>
                  </div>
                  <div className='ry_bodycontainer_right'>
                    <div className='card_dashboard _w-100'>
                      <div className='card_dashboard_top-left'>
                        <div className='ry_person-style1'>
                          <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f872fa62a3b4c3127d_person_01.png' />
                        </div>
                        <div className='div-block-382'>
                          <h1 className='ry_h3-display1'>{data.name}</h1>
                          <div className='ry_p-style1'>{data.designation}</div>
                        </div>
                      </div>
                      <div className='ry_cardcontent-style1 mt-10'>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Hire Date</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{data.hireDate}</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Review Cycle</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue align-right'>
                              {data.reviewCycle}
                            </p>
                          </div>
                        </div>
                        <div className='ry_linedivider' />
                        <div className='ry_cardtop'>
                          <div className='div-block-395'>
                            <div className='card_dashboard-label'>Survey Progress</div>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Invited</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{data.invited}</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Done</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>
                              {data.done} ({((data.done / data.invited) * 100).toFixed(0)}%)
                            </p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Not Responded</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>
                              {data.notResponded} (
                              {((data.notResponded / data.invited) * 100).toFixed(0)}%)
                            </p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <p className='ry_p-style1 mb-0'>Declined</p>
                          </div>
                          <div className='ry_cardcontent_rowcol justfiy-right'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{data.decline}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withTracker(() => {
  Feedbacks.initiateWatch('Feedback');
  Client.initiateWatch('Feedback');

  return {
    Client: Client.user(),
    feedback: Feedbacks.Data,
  };
})(Feedback);
