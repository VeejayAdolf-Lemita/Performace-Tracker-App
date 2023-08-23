import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PieChart from './charts/PieChart';
import GoalPieChart from './charts/GoalPieChart';
import BarChart from './charts/BarChart';
import Goals from '../../api/classes/client/goals/Goals';
import Insight from '../../api/classes/client/insights/Insights';
import Productivity from '../../api/classes/client/dashboard/Productivity';
import Rating from '../../api/classes/client/dashboard/Rating';
import moment from 'moment';

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalState: '',
      productivityState: 'Today',
      ratingState: 'Total',
    };
    Insight.setWatcher(this, 'Insights');
    Goals.setWatcher(this, 'Insights');
    Productivity.setWatcher(this, 'Insights');
    Rating.setWatcher(this, 'Insights');
  }

  componentDidMount() {
    Insight.getActiveMember();
    Insight.getActiveMemberYesterday();
    Insight.getActiveMemberWeekly();
    Goals.getGoals();
    Productivity.getProductivity(this.state.productivityState);
    Rating.getRatings(this.state.ratingState);
  }

  handleGoalChange = (event) => {
    Goals.getGoals(event.target.value);
  };

  handleProductivityChange = (event) => {
    Productivity.getProductivity(event.target.value);
  };

  handleRatingChange = (event) => {
    Rating.getRatings(event.target.value);
  };

  render() {
    const { insights, insightsYesterday, insightsWeekly } = this.props;
    console.log(insights);
    console.log(insightsYesterday);
    console.log(insightsWeekly);
    let totalActiveTimeInSeconds = 0;

    for (const insight of insights) {
      totalActiveTimeInSeconds += insight.activeTime;
    }

    const hours = Math.floor(totalActiveTimeInSeconds / 3600);
    const minutes = Math.floor((totalActiveTimeInSeconds % 3600) / 60);
    const seconds = totalActiveTimeInSeconds % 60;

    const formattedTotalActiveTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    let totalActiveTimeInSecondsYesterday = 0;

    for (const insight of insightsYesterday) {
      totalActiveTimeInSecondsYesterday += insight.activeTime;
    }

    const hoursYesterday = Math.floor(totalActiveTimeInSecondsYesterday / 3600);
    const minutesYesterday = Math.floor((totalActiveTimeInSecondsYesterday % 3600) / 60);
    const secondsYesterday = totalActiveTimeInSecondsYesterday % 60;

    const formattedTotalActiveTimeYesterday = `${hoursYesterday
      .toString()
      .padStart(2, '0')}:${minutesYesterday.toString().padStart(2, '0')}:${secondsYesterday
      .toString()
      .padStart(2, '0')}`;

    let totalActiveTimeAllEmployees = 0;
    for (const employeeData of insightsWeekly) {
      const totalActiveTimeForEmployee = employeeData.totalActiveTime.reduce(
        (acc, time) => acc + time,
        0,
      );
      totalActiveTimeAllEmployees += totalActiveTimeForEmployee;
    }

    const totalHoursAllEmployees = Math.floor(totalActiveTimeAllEmployees / 3600);
    const totalMinutesAllEmployees = Math.floor((totalActiveTimeAllEmployees % 3600) / 60);
    const totalSecondsAllEmployees = totalActiveTimeAllEmployees % 60;

    const formattedTotalActiveTimeAllEmployees = `${totalHoursAllEmployees
      .toString()
      .padStart(2, '0')}:${totalMinutesAllEmployees
      .toString()
      .padStart(2, '0')}:${totalSecondsAllEmployees.toString().padStart(2, '0')}`;

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
                      <div className='ry_p-style1'></div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>{formattedTotalActiveTime}</h1>
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
                      <div className='ry_p-style1'></div>
                    </div>
                    <h1 className='ry_h3-display1 weight-semibold'>
                      {formattedTotalActiveTimeYesterday}
                    </h1>
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
                      {formattedTotalActiveTimeAllEmployees}
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
                          <div>
                            <select
                              className='ry_selectfieldsmall w-select'
                              onChange={this.handleGoalChange}
                            >
                              <option value=''>All Goals</option>
                              <option value='Today'>Today</option>
                              <option value='Weekly'>Weekly</option>
                            </select>
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
                              className='ry_selectfieldsmall w-select'
                              onChange={this.handleProductivityChange}
                            >
                              <option value='Today'>Today</option>
                              <option value='Weekly'>Weekly</option>
                              <option value='Monthly'>Monthly</option>
                            </select>
                          </div>
                        </div>
                        <div className='ry_cardcontent-style2'>
                          <div className='ry_cardcontent-style2_left'>
                            {this.props.productivity.map((data) => (
                              <div className='ry_productivitylabel_container' key={data._id}>
                                <div className='ry_productivitylabel'>
                                  {data.name === 'Productivity' ? (
                                    <div className='div-block-391 bg-green' />
                                  ) : data.name === 'Neutral' ? (
                                    <div className='div-block-391 bg-gray' />
                                  ) : data.name === 'Non-Productive' ? (
                                    <div className='div-block-391 bg-red' />
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
                            <PieChart data={this.props.productivity} colors={COLORS} />
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
                              className='ry_selectfieldsmall w-select'
                              onChange={this.handleRatingChange}
                            >
                              <option value='Total'>Rating</option>
                              <option value='Today'>Today</option>
                              <option value='Weekly'>Weekly</option>
                            </select>
                          </div>
                        </div>
                        <div className='ry_barchart'>
                          <BarChart data={this.props.rating} />
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
  Productivity.initiateWatch('Insights');
  Rating.initiateWatch('Insights');
  return {
    goals: Goals.Data,
    insights: Insight.DataToday,
    insightsYesterday: Insight.DataYesterday,
    insightsWeekly: Insight.DataWeekly,
    productivity: Productivity.Data,
    rating: Rating.Data,
  };
})(Insights);
