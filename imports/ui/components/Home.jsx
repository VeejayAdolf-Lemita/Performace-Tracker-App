import React, { Component } from 'react';
import Piechart from './charts/PieChart';
import GoalPieChart from './charts/GoalPieChart';
import Barchart from './charts/BarChart';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';
import Productivity from '../../api/classes/client/dashboard/Productivity';
import Activity from '../../api/classes/client/dashboard/Activity';
import Rating from '../../api/classes/client/dashboard/Rating';
import Goals from '../../api/classes/client/goals/Goals';

const COLORS = ['#00b8b0', '#ccc', '#f4404e'];
const GCOLORS = ['#00b8b0', '#ccc', '#fbb03b'];

const now = new Date();
const utcOffset = -now.getTimezoneOffset() / 60;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productivityState: 'Today',
      ratingState: 'Today',
    };
    Client.setWatcher(this, 'Home');
    Productivity.setWatcher(this, 'Home');
    Goals.setWatcher(this, 'Home');
    Activity.setWatcher(this, 'Home');
    Rating.setWatcher(this, 'Home');
    this.handleProductivityChange = this.handleProductivityChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  componentDidMount() {
    Productivity.getProductivity(`${this.state.productivityState}`);
    Rating.getRatings(`${this.state.ratingState}`);
    Activity.getActivity();
    Goals.getGoals();
  }

  handleProductivityChange(event) {
    this.setState({ productivityState: event.target.value });
  }

  handleProductivityFilter = () => {
    Productivity.getProductivity(`${this.state.productivityState}`);
  };

  handleGoalChange = (event) => {
    this.setState({ goalState: event.target.value });
  };

  handleGoalFilter = () => {
    Goals.getGoals(`${this.state.goalState}`);
  };

  handleRatingChange(event) {
    this.setState({ ratingState: event.target.value });
    Rating.getRatings(`${this.state.ratingState}`);
  }

  render() {
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

    if (Client.user())
      return (
        <div className='ry_main-style1'>
          <div className='ry_main-style1_container'>
            <div className='section-style1 mt-0'>
              <div className='ry_dashboard_top dashboard'>
                <div className='ry_breadcrumbs_container'>
                  <a href='#' className='ry_breadcrumbs-style1'>
                    Dashboard
                  </a>
                  <div className='ry_breadcrumbsdivider'>/</div>
                  <a href='#' className='ry_breadcrumbs-style1'>
                    Overview
                  </a>
                </div>
                <div className='ry_headercontainer'>
                  <h1 className='ry_h1-display1 text-white'>
                    Welcome back, {this.props.Client.profile.firstName}
                  </h1>
                  <div className='ry_emoji'>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face.png'
                      loading='lazy'
                      sizes='(max-width: 479px) 27vw, (max-width: 767px) 9vw, (max-width: 1439px) 50px, (max-width: 1919px) 3vw, 50px'
                      srcSet='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face-p-500.png 500w, https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647efb9d58835441406b1e5f_happy-face.png 512w'
                      alt=''
                    />
                  </div>
                </div>
                <div className='dashboard_top-card_container mobile-vertical'>
                  <div className='card_dashboard_top mobile-100'>
                    <div className='card_dashboard_top-left'>
                      <div className='ry_person-style1'>
                        <img
                          src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f872fa62a3b4c3127d_person_01.png'
                          loading='lazy'
                          alt=''
                        />
                      </div>
                      <div className='div-block-382'>
                        <h1 className='ry_h3-display1'>{this.props.Client.profile.username}</h1>
                        <div className='div-block-383'>
                          <div className='ry_iconsmall'>
                            <img
                              src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f879562c8b340dc502_icon_person.svg'
                              loading='lazy'
                              alt=''
                            />
                          </div>
                          <div className='ry_p-style1'>{this.props.Client.profile.position}</div>
                        </div>
                      </div>
                    </div>
                    <div className='card-dashboard_top-right'>
                      <h1 className='ry_h3-display1 weight-semibold'>09:55 AM</h1>
                      <div className='ry_p-style1'>
                        {`UTC: ${utcOffset > 0 ? '+' : ''}${utcOffset}
                        :00  Europe/Berlin `}
                      </div>
                    </div>
                  </div>
                  <div className='card_dashboard_top mobile-100'>
                    <div className='card_dashboard_top-left'>
                      <div className='div-block-382'>
                        <h1 className='card_data'>23</h1>
                        <div className='ry_p-style1'>Members</div>
                      </div>
                    </div>
                    <div className='card_dashboard_top-left flex-vertical'>
                      <h1 className='ry_h3-display1 weight-semibold'>$200</h1>
                      <div className='ry_p-style1'>Last Invoice</div>
                    </div>
                    <div className='card-dashboard_top-right'>
                      <h1 className='ry_h3-display1 weight-semibold'>21 Oct, 2021</h1>
                      <div className='ry_p-style1'>Next Payment on</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='ry_body'>
                <div className='card_row_container'>
                  <div className='card_dashboard'>
                    <div className='w-form'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Todays' Activity</div>
                        {/* <div>
                          <select className='ry_selectfieldsmall w-select'>
                            <option value='Today'>Today</option>
                            <option value='Weekly'>Weekly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Yearly'>Yearly</option>
                          </select>
                        </div> */}
                        {/* <div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            stroke-width='2'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            class='feather feather-filter'
                          >
                            <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
                          </svg>
                        </div> */}
                      </div>
                      <div className='ry_cardcontent-style1'>
                        {this.props.activity.map((data) => (
                          <div className='ry_cardcontent_row' key={data._id}>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_person-style2'>
                                <img src={data.image} loading='lazy' alt='' />
                              </div>
                              <p className='ry_p-style1 mb-0'>{data.employeeName}</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-25'>
                              <p className='ry_p-style1 mb-0'>{data.activeTime}</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-green'>{`${data.productivity}%`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='card_dashboard'>
                    <div className='w-form'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Productivity</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <select
                            className='ry_selectfieldsmall w-select'
                            onChange={this.handleProductivityChange}
                            value={this.state.productivityState}
                          >
                            <option value='Today'>Today</option>
                            <option value='Weekly'>Weekly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Yearly'>Yearly</option>
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
                            onClick={this.handleProductivityFilter}
                          >
                            <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
                          </svg>
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
                          <Piechart data={this.props.productivity} colors={COLORS} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card_dashboard'>
                    <div className='w-form'>
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
                    </div>
                  </div>
                </div>
                <div className='card_row_container'>
                  <div className='card_dashboard'>
                    <div className='w-form'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Attendance</div>
                        <div>
                          <select className='ry_selectfieldsmall w-select'>
                            <option value>Today</option>
                            <option value='First'>Weekly</option>
                            <option value='Second'>Monthly</option>
                            <option value='Third'>Yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className='ry_cardcontent-style1'>
                        <div className='card_dashboard_top-left mb-10'>
                          <div className='ry_icon-style2'>
                            <img
                              src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f13dcda12f6eb616b3ae6_icon_attendance.svg'
                              loading='lazy'
                              alt=''
                            />
                          </div>
                          <div className='div-block-382'>
                            <h1 className='ry_h4-display1'>50 of 80 active</h1>
                            <div className='ry_p-style1'>from yesterday (70)</div>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-red' />
                            <p className='ry_p-style1 mb-0'>Late</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>85%</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-orange' />
                            <p className='ry_p-style1 mb-0'>Early Leaving</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>85%</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-violet' />
                            <p className='ry_p-style1 mb-0'>Less Tracking</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>85%</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-gray' />
                            <p className='ry_p-style1 mb-0'>Absent</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>85%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card_dashboard _w-66'>
                    <div className='w-form'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Top Members</div>
                        <div>
                          <select
                            className='ry_selectfieldsmall w-select'
                            value={this.state.ratingState}
                            onChange={this.handleRatingChange}
                          >
                            <option value='Today'>Today</option>
                            <option value='Weekly'>Weekly</option>
                            <option value='Monthly'>Monthly</option>
                            <option value='Yearly'>Yearly</option>
                          </select>
                        </div>
                      </div>
                      <div className='ry_barchart'>
                        <Barchart data={this.props.rating} />;
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
  Client.initiateWatch('Home');
  Productivity.initiateWatch('Home');
  Goals.setWatcher(this, 'Goals');
  Activity.initiateWatch('Home');
  Rating.initiateWatch('Home');
  return {
    isReady: Client.init(),
    Client: Client.user(),
    productivity: Productivity.Data,
    goals: Goals.Data,
    activity: Activity.Data,
    rating: Rating.Data,
  };
})(Home);
