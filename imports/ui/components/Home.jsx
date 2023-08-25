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
import Attendance from '../../api/classes/client/dashboard/Attendance';
import Employees from '../../api/classes/client/review/Employees';
import moment from 'moment';

// const dateString = '2023-08-08';
// const timestamp2 = moment(dateString).unix();
// console.log(timestamp2);

// // Create a moment object from the UNIX timestamp
// const momentObject = moment.unix(timestamp2);

// // Format the moment object as desired
// const formattedDate = momentObject.format('HH:mm:ss');
// console.log(formattedDate);

// // const formattedDate = moment.unix(timestamp2).format('MM-DD-YYYY HH:mm:ss');
// // console.log(formattedDate);

// // Active time calculation
// // const timeIn = 1692716400;
// // const timeOut = 1692741600;
// // const timeDuration = timeOut - timeIn;

// const duration = moment.duration(36000, 'seconds');
// const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
// console.log(formattedDuration);
// // console.log(formattedDuration);
// // const duration = moment.duration(36000, 'seconds');
// // const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
// // console.log(formattedDuration);
// console.log(moment().startOf('week').valueOf());
// console.log(moment().endOf('week').valueOf());

const GCOLORS = ['#00b8b0', '#ccc', '#fbb03b'];
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // Convert 0 to 12
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
}

const currentTime = new Date();
const formattedTime = formatAMPM(currentTime);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productivityState: 'Today',
      ratingState: 'Total',
      attendance: 'Today',
    };
    Client.setWatcher(this, 'Home');
    Productivity.setWatcher(this, 'Home');
    Goals.setWatcher(this, 'Home');
    Activity.setWatcher(this, 'Home');
    Rating.setWatcher(this, 'Home');
    Attendance.setWatcher(this, 'Home');
    Employees.setWatcher(this, 'Home');
  }

  componentDidMount() {
    Productivity.getProductivity(`${this.state.productivityState}`);
    Rating.getRatings(`${this.state.ratingState}`);
    Activity.getActivity();
    Goals.getGoals();
    Attendance.getActiveAttendance(`${this.state.attendance}`);
    Employees.getEmployees();
  }

  handleProductivityChange = (event) => {
    Productivity.getProductivity(event.target.value);
  };

  handleGoalChange = (event) => {
    Goals.getGoals(event.target.value);
  };

  handleRatingChange = (event) => {
    Rating.getRatings(event.target.value);
  };

  handleAttendanceFilter = (e) => {
    Attendance.getActiveAttendance(e.target.value);
  };
  render() {
    const dashboardActive = this.props.attendance;
    console.log(this.props.attendance);

    // Find the count of "Absent" status
    const absentStatus = dashboardActive.find((item) => item.status === 'Absent');
    const absentCount = absentStatus ? absentStatus.count : 0;

    // Find the total count of all records
    const totalCount = dashboardActive.reduce((total, item) => total + item.count, 0);

    // Calculate the percentage
    const absentPercentage = (absentCount / totalCount) * 100;

    const earlyLeavingStatus = dashboardActive.find((item) => item.status === 'Present');
    const earlyLeavingCount = earlyLeavingStatus ? earlyLeavingStatus.earlyLeavingCount : 0;

    const lateArrivalStatus = dashboardActive.find((item) => item.status === 'Present');
    const lateArrivalCount = lateArrivalStatus ? lateArrivalStatus.lateArrivalCount : 0;

    // Find the total count of all "Present" records
    const totalPresentCount = earlyLeavingCount + lateArrivalCount;

    // Calculate the percentages
    const earlyLeavingPercentage = (earlyLeavingCount / totalPresentCount) * 100;
    const lateArrivalPercentage = (lateArrivalCount / totalPresentCount) * 100;

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
                        <h1 className='ry_h3-display1'>{this.props.Client.profile.firstName}</h1>
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
                      <h1 className='ry_h3-display1 weight-semibold'>{formattedTime}</h1>
                      <div className='ry_p-style1'>{this.props.Client.profile.timezone}</div>
                    </div>
                  </div>
                  <div className='card_dashboard_top mobile-100'>
                    <div className='card_dashboard_top-left'>
                      <div className='div-block-382'>
                        <h1 className='card_data'>{this.props.employees.length}</h1>
                        <div className='ry_p-style1'>Members</div>
                      </div>
                    </div>
                    <div className='card_dashboard_top-left flex-vertical'>
                      <h1 className='ry_h3-display1 weight-semibold'>N/A</h1>
                      <div className='ry_p-style1'>Last Invoice</div>
                    </div>
                    <div className='card-dashboard_top-right'>
                      <h1 className='ry_h3-display1 weight-semibold'>N/A</h1>
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
                          <Piechart data={this.props.productivity} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card_dashboard'>
                    <div className='w-form'>
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
                    </div>
                  </div>
                </div>
                <div className='card_row_container'>
                  <div className='card_dashboard'>
                    <div className='w-form'>
                      <div className='ry_cardtop'>
                        <div className='card_dashboard-label'>Attendance</div>
                        <div>
                          <select
                            className='ry_selectfieldsmall w-select'
                            onChange={this.handleAttendanceFilter}
                          >
                            <option value>Today</option>
                            <option value='Yesterday'>Yesterday</option>
                            <option value='Weekly'>Weekly</option>
                          </select>
                        </div>
                      </div>
                      <div className='ry_cardcontent-style1'>
                        <div className='card_dashboard_top-left mb-10'>
                          <div className='ry_icon-style2'>
                            <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f13dcda12f6eb616b3ae6_icon_attendance.svg' />
                          </div>
                          <div className='div-block-382'>
                            <h1 className='ry_h4-display1'>
                              {totalCount} of {this.props.employees.length} active
                            </h1>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-red' />
                            <p className='ry_p-style1 mb-0'>Late</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{`${
                              isNaN(lateArrivalPercentage) ? '0' : lateArrivalPercentage.toFixed(0)
                            }%`}</p>
                          </div>
                        </div>
                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-orange' />
                            <p className='ry_p-style1 mb-0'>Early Leaving</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{`${
                              isNaN(earlyLeavingPercentage)
                                ? '0'
                                : earlyLeavingPercentage.toFixed(0)
                            }%`}</p>
                          </div>
                        </div>

                        <div className='ry_cardcontent_row no-border'>
                          <div className='ry_cardcontent_rowcol'>
                            <div className='div-block-391 bg-gray' />
                            <p className='ry_p-style1 mb-0'>Absent</p>
                          </div>
                          <div className='ry_cardcontent_rowcol _w-10'>
                            <p className='ry_p-style1 mb-0 text-darkblue'>{`${
                              isNaN(absentPercentage) ? '0' : absentPercentage.toFixed(0)
                            }%`}</p>
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
                            onChange={this.handleRatingChange}
                          >
                            <option value='Total'>Rating</option>
                            <option value='Today'>Today</option>
                            <option value='Weekly'>Weekly</option>
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
  Attendance.initiateWatch('Home');
  Employees.initiateWatch('Home');
  return {
    isReady: Client.init(),
    Client: Client.user(),
    productivity: Productivity.Data,
    goals: Goals.Data,
    activity: Activity.Data,
    rating: Rating.Data,
    attendance: Attendance.Data,
    employees: Employees.Data,
  };
})(Home);
