import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PieChart from './charts/GoalPieChart';
import GoalPieChart from './charts/GoalPieChart';
import Goals from '../../api/classes/client/goals/Goals';
import Insight from '../../api/classes/client/insights/Insights';

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalState: '',
    };
    Goals.setWatcher(this, 'Insights');
    Insight.setWatcher(this, 'Insights');
  }

  componentDidMount() {
    Goals.getGoals();
    Insight.getActiveMember();
    Insight.getActiveMemberYesterday();
    Insight.getActiveMemberWeekly();
  }

  handleGoalChange = (event) => {
    this.setState({ goalState: event.target.value });
  };

  handleGoalFilter = () => {
    Goals.getGoals(`${this.state.goalState}`);
  };

  render() {
    const { insights, insightsYesterday, insightsWeekly } = this.props;

    let totalActiveTimeToday = 0;

    insights.forEach((entry) => {
      const [hours, minutes, seconds] = entry.activeTime.split(':');
      totalActiveTimeToday +=
        parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    });

    const hours = Math.floor(totalActiveTimeToday / 3600);
    const minutes = Math.floor((totalActiveTimeToday % 3600) / 60);
    const seconds = totalActiveTimeToday % 60;

    const formattedTimeToday = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    let totalActiveTimeYesterday = 0;

    insightsYesterday.forEach((entry) => {
      const [hours, minutes, seconds] = entry.activeTime.split(':');
      totalActiveTimeYesterday +=
        parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    });

    const hoursYesterday = Math.floor(totalActiveTimeYesterday / 3600);
    const minutesYesterday = Math.floor((totalActiveTimeYesterday % 3600) / 60);
    const secondsYesterday = totalActiveTimeYesterday % 60;

    const formattedTimeYesterday = `${hoursYesterday.toString().padStart(2, '0')}:${minutesYesterday
      .toString()
      .padStart(2, '0')}:${secondsYesterday.toString().padStart(2, '0')}`;

    // Calculate total active time for each employee
    const updatedInsightsWeekly = insightsWeekly.map((employee) => {
      const totalActiveTimeInSeconds = employee.totalActiveTime.reduce((total, timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        return total + hours * 3600 + minutes * 60 + seconds;
      }, 0);

      const totalHours = Math.floor(totalActiveTimeInSeconds / 3600);
      const totalMinutes = Math.floor((totalActiveTimeInSeconds % 3600) / 60);
      const totalSeconds = totalActiveTimeInSeconds % 60;

      const formattedTotalActiveTime = `${totalHours}:${totalMinutes
        .toString()
        .padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;

      return {
        ...employee,
        totalActiveTimeInSeconds, // Include total in seconds
        formattedTotalActiveTime,
      };
    });

    // Calculate total active time for all employees
    const totalActiveTimeAllEmployees = updatedInsightsWeekly.reduce(
      (total, employee) => total + employee.totalActiveTimeInSeconds,
      0,
    );

    // Convert the total active time to hours, minutes, and seconds
    const totalHoursAll = Math.floor(totalActiveTimeAllEmployees / 3600);
    const totalMinutesAll = Math.floor((totalActiveTimeAllEmployees % 3600) / 60);
    const totalSecondsAll = totalActiveTimeAllEmployees % 60;

    const formattedTotalActiveTimeAll = `${totalHoursAll}:${totalMinutesAll
      .toString()
      .padStart(2, '0')}:${totalSecondsAll.toString().padStart(2, '0')}`;

    console.log(this.props.insightsYesterday);
    console.log(this.props.insights);

    const COLORS = ['#00b8b0', '#ccc', '#f4404e'];
    const GCOLORS = ['#00b8b0', '#ccc', '#fbb03b'];
    const achieved = this.props.goals.filter((goal) => goal.achieved);
    const inprogress = this.props.goals.filter((goal) => goal.percentage < 60);
    const deferred = this.props.goals.filter((goal) => goal.percentage >= 80);
    const totalGoals = this.props.goals.length;

    const achievedPercentage = Math.round((achieved.length / totalGoals) * 100);
    const inprogressPercentage = Math.round((inprogress.length / totalGoals) * 100);
    const deferredPercentage = Math.round((deferred.length / totalGoals) * 100);

    const goalsData = [
      {
        name: 'Achieved',
        value: achievedPercentage,
      },
      {
        name: 'Deferred',
        value: deferredPercentage,
      },
      {
        name: 'In Progress',
        value: inprogressPercentage,
      },
    ];

    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Productivity</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Insights</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Insights</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='reports_top-card_container'>
                <div className='card_dashboard_top _w-33'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Today</div>
                      <div className='ry_p-style1'>
                        <span className='span-red'>-75%</span> yesterday
                      </div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{`${formattedTimeToday}h`}</h1>
                  </div>
                  <div className='card-dashboard_top-right horizontal'>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>{this.props.insights.length}</span> Active
                      members
                    </div>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>
                        {' '}
                        {this.props.goals.filter((goal) => !goal.achieved).length}
                      </span>{' '}
                      Active Goals
                    </div>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>Yesterday</div>
                      <div className='ry_p-style1'>
                        <span className='span-green'>10%</span> yesterday
                      </div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{`${formattedTimeYesterday}h`}</h1>
                  </div>
                  <div className='card-dashboard_top-right horizontal'>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>{this.props.insightsYesterday.length}</span>{' '}
                      Active members
                    </div>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>
                        {this.props.goals.filter((goal) => !goal.achieved).length}
                      </span>{' '}
                      Active Goals
                    </div>
                  </div>
                </div>
                <div className='card_dashboard_top _w-33'>
                  <div className='card_dashboard_top-left justify-spacebetween'>
                    <div className='div-block-382'>
                      <div className='card_dashboard-label'>This Week</div>
                      <div className='ry_p-style1'>Total Active Time</div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {`${formattedTotalActiveTimeAll}h`}
                    </h1>
                  </div>
                  <div className='card-dashboard_top-right horizontal'>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>{this.props.insightsWeekly.length}</span>{' '}
                      Active members
                    </div>
                    <div className='ry_p-style1'>
                      <span className='span-darkblue'>
                        {this.props.goals.filter((goal) => !goal.achieved).length}
                      </span>{' '}
                      Active Goals
                    </div>
                  </div>
                </div>
              </div>
              <div className='ry_bodycontainer flex-vertical'>
                <div className='card_row_container'>
                  <div className='card_dashboard _w-66'>
                    <div className='w-form'>
                      <form>
                        <div className='ry_cardtop'>
                          <div className='card_dashboard-label'>Goals</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <select
                              className='ry_selectfieldsmall w-select'
                              value={this.state.goalState}
                              onChange={this.handleGoalChange}
                            >
                              <option value=''>All Goals</option>
                              <option value='Today'>Today</option>
                              <option value='Weekly'>Weekly</option>
                            </select>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='1'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='feather feather-filter'
                              style={{
                                cursor: 'pointer',
                              }}
                              onClick={this.handleGoalFilter}
                            >
                              <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
                            </svg>
                          </div>
                        </div>
                        <div className='ry_cardcontent-style2'>
                          <div className='ry_cardcontent-style2_left'>
                            {goalsData.map((data, index) => (
                              <div className='ry_productivitylabel_container' key={index}>
                                <div className='ry_productivitylabel'>
                                  {data.name === 'Achieved' ? (
                                    <div className='div-block-391 bg-green' />
                                  ) : data.name === 'Deferred' ? (
                                    <div className='div-block-391 bg-gray' />
                                  ) : data.name === 'In Progress' ? (
                                    <div className='div-block-391 bg-orange' />
                                  ) : (
                                    ''
                                  )}
                                  <h1 className='ry_h3-display1 weight-semibold'>{`${data.value}%`}</h1>
                                </div>
                                <div className='ry_p-style1'>{data.name}</div>
                              </div>
                            ))}
                          </div>
                          <div className='ry_cardcontent-style2_right'>
                            <GoalPieChart
                              data={goalsData}
                              dataLength={this.props.goals}
                              colors={GCOLORS}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className='card_dashboard _w-33'>
                    <div className='w-form'>
                      <form>
                        <div className='ry_cardtop'>
                          <div className='card_dashboard-label'>Productivity</div>
                          <div>
                            <select
                              id='field-2'
                              name='field-2'
                              data-name='Field 2'
                              className='ry_selectfieldsmall w-select'
                            >
                              <option value>Today</option>
                              <option value='First'>First choice</option>
                              <option value='Second'>Second choice</option>
                              <option value='Third'>Third choice</option>
                            </select>
                          </div>
                        </div>
                        <div className='ry_cardcontent-style2'>
                          <div className='ry_cardcontent-style2_left'>
                            <div className='ry_productivitylabel_container'>
                              <div className='ry_productivitylabel'>
                                <div className='div-block-391' />
                                <h1 className='ry_h3-display1 weight-semibold'>70%</h1>
                              </div>
                              <div className='ry_p-style1'>Productivity</div>
                            </div>
                            <div className='ry_productivitylabel_container'>
                              <div className='ry_productivitylabel'>
                                <div className='div-block-391 bg-gray' />
                                <h1 className='ry_h3-display1 weight-semibold'>25%</h1>
                              </div>
                              <div className='ry_p-style1'>Neutral</div>
                            </div>
                            <div className='ry_productivitylabel_container'>
                              <div className='ry_productivitylabel'>
                                <div className='div-block-391 bg-red' />
                                <h1 className='ry_h3-display1 weight-semibold'>5%</h1>
                              </div>
                              <div className='ry_p-style1'>Non- Productive</div>
                            </div>
                          </div>
                          <div className='ry_cardcontent-style2_right'>
                            <div className='ry_piechart'>
                              <h1 className='ry_h1-display1'>70%</h1>
                              <div className='ry_p-style1'>Productive</div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='card_row_container'>
                  <div className='card_dashboard _w-100'>
                    <div className='w-form'>
                      <form
                        id='email-form-2'
                        name='email-form-2'
                        data-name='Email Form 2'
                        method='get'
                        aria-label='Email Form 2'
                      >
                        <div className='ry_cardtop'>
                          <div className='card_dashboard-label'>Top Members</div>
                          <div>
                            <select
                              id='field-3'
                              name='field-3'
                              data-name='Field 3'
                              className='ry_selectfieldsmall w-select'
                            >
                              <option value>Today</option>
                              <option value='First'>First choice</option>
                              <option value='Second'>Second choice</option>
                              <option value='Third'>Third choice</option>
                            </select>
                          </div>
                        </div>
                        <div className='ry_barchart'>
                          <img
                            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f16df88baf63d40220dfa_chart_01.svg'
                            className='image-100'
                          />
                        </div>
                      </form>
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
  Goals.initiateWatch('Insights');
  Insight.initiateWatch('Insights');
  return {
    goals: Goals.Data,
    insights: Insight.DataToday,
    insightsYesterday: Insight.DataYesterday,
    insightsWeekly: Insight.DataWeekly,
  };
})(Insights);
