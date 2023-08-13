import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';
import Goalss from '../../api/classes/client/goals/Goals';
import Notes from '../../api/classes/client/goals/Notes';

const today = new Date();
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const formatted_date = `${monthNames[today.getMonth()]} ${addLeadingZero(
  today.getDate(),
)}, ${today.getFullYear()}`;
function addLeadingZero(number) {
  return number < 10 ? '0' + number : number;
}
class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openNoteModal: false,
      setCompletion: '',
      goalEnd: '',
      goalStart: formatted_date,
      createdAt: formatted_date,
      achieved: false,
      goalName: '',
      noteFrom: `${this.props.Client.profile.username}`,
      goalId: '',
      note: '',
      goalFilter: '',
    };
    Client.setWatcher(this, 'Goals');
    Goalss.setWatcher(this, 'Goals');
    Notes.setWatcher(this, 'Goals');
  }

  componentDidMount() {
    Goalss.getGoals();
  }

  handleGoalFilter = (event) => {
    this.setState({ goalFilter: event.target.value });
  };

  handleSubmitFilter = () => {
    Goalss.getGoals(this.state.goalFilter);
  };

  handleGoalName = (event) => {
    this.setState({
      goalName: event.target.value,
    });
  };

  handleGoalEnd = (event) => {
    const selectedDate = new Date(event.target.value);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);

    this.setState({
      setCompletion: event.target.value,
      goalEnd: formattedDate,
    });
  };

  handleCloseNoteModal = () => {
    this.setState({ openNoteModal: false });
  };

  handleOpenNoteModal = (goalId) => () => {
    this.setState({ openNoteModal: true, goalId });
    Notes.getNotes(goalId);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleAddGoal = () => {
    const { goalEnd, goalStart, createdAt, achieved, goalName } = this.state;
    const newGoal = {
      name: goalName,
      goalStart,
      goalEnd,
      createdAt,
      achieved,
    };
    Goalss.addGoal(newGoal);
    Goalss.getGoals();
    this.setState({
      goalEnd: '',
      goalName: '',
      setCompletion: '',
    });
  };

  handleNoteMessage = (event) => {
    this.setState({ note: event.target.value });
  };

  handleAddNote = () => {
    const { createdAt, noteFrom, goalId, note } = this.state;
    const newNote = {
      goalId,
      noteFrom,
      note,
      createdAt,
    };
    Notes.addNote(newNote);
    this.setState({
      note: '',
      openNoteModal: false,
    });
  };

  render() {
    const { openModal, openNoteModal, goalFilter } = this.state;

    return (
      <div className='ry_main-style1'>
        <div className='ry_add-review-popup' style={{ display: openModal ? 'flex' : 'none' }}>
          <div className='ry_popup'>
            <div className='ry_popup-top'>
              <div className='ry_popup-header'>Add Goal</div>
              <div className='ry_icon-close' onClick={this.handleCloseModal}>
                <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
              </div>
            </div>
            <div className='w-form'>
              <form className='form-2'>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Name</label>
                  <div className='form-control'>
                    <input
                      className='ry_text-field-style1 w-input'
                      onChange={this.handleGoalName}
                      value={this.state.goalName}
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Completion Date</label>
                  <div className='form-control'>
                    <input
                      type='date'
                      className='ry_text-field-style1 w-input'
                      required
                      onChange={this.handleGoalEnd}
                      value={this.state.setCompletion}
                    />
                  </div>
                </div>
                <div className='ry_form-btn_containers' onClick={this.handleAddGoal}>
                  <div className='ry_btn-style1 w-button'>Submit</div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='ry_add-review-popup' style={{ display: openNoteModal ? 'flex' : 'none' }}>
          <div className='ry_popup'>
            <div className='ry_popup-top'>
              <div className='ry_popup-header'>Add Note</div>
              <div className='ry_icon-close' onClick={this.handleCloseNoteModal}>
                <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
              </div>
            </div>
            <div className='w-form'>
              <form className='form-2'>
                <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                  {this.props.notes.map((data) => (
                    <div className='ry_review' key={data._id}>
                      <div className='ry_reviewright flex-horizontal'>
                        <div className='ry_reviewrighttop flex-vertical'>
                          <div className='ry_reviewright'>
                            <div className='ry_reviewrighttop'>
                              <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                                {data.noteFrom}
                              </p>
                            </div>
                            <p className='ry_p-style1'>{data.note}</p>
                            <p className='ry_p-style2'>{data.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Note</label>
                  <div className='form-control'>
                    <input
                      className='ry_text-field-style1 w-input'
                      onChange={this.handleNoteMessage}
                      value={this.state.note}
                      required
                    />
                  </div>
                </div>
                <div className='ry_form-btn_containers' onClick={this.handleAddNote}>
                  <div className='ry_btn-style1 w-button'>Submit</div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <div className='ry_breadcrumbs-style1'>Goals</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Overview</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Goals</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <select
                    className='ry_selectfieldsmall w-select'
                    style={{ width: '250px', height: '30px', fontSize: '1rem' }}
                    onChange={this.handleGoalFilter}
                    value={goalFilter}
                  >
                    <option value=''>All Goals</option>
                    <option value='Today'>Today</option>
                    <option value='Weekly'>Weekly</option>
                  </select>
                </div>
                <div
                  className='ry_bodytop_right'
                  style={{ cursor: 'pointer' }}
                  onClick={this.handleSubmitFilter}
                >
                  <div className='ry_icon-btn-style1 light mr-10 w-inline-block'>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                      className='icon-btn_asset'
                    />
                    <div>Filter</div>
                  </div>
                  <div
                    className='ry_icon-btn-style1 w-inline-block'
                    onClick={this.handleOpenModal}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg'
                      className='icon-btn_asset'
                    />
                    <div>Add</div>
                  </div>
                </div>
              </div>
              <div className='ry_bodycontainer'>
                <div className='ry_bodycontainer_left'>
                  {this.props.goals.map((data) => (
                    <div className='ry_review' key={data._id}>
                      <div className='ry_reviewleft'>
                        <div
                          className={
                            data.achieved
                              ? 'ry_goalsstatus bg-green'
                              : data.percentage >= 80
                              ? 'ry_goalsstatus bg-red'
                              : data.percentage >= 60
                              ? 'ry_goalsstatus bg-yellow'
                              : 'ry_goalsstatus'
                          }
                        />
                      </div>
                      <div className='ry_reviewright flex-horizontal'>
                        <div className='ry_reviewrighttop flex-vertical'>
                          <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                            {data.name}
                          </p>
                          <div
                            className='ry_reviewmicro mt-10'
                            onClick={this.handleOpenNoteModal(data._id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className='ry_reviewmicro_icon'>
                              <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7ec8d98bb32195c8ea_review_02.svg' />
                            </div>
                            <div>View Note</div>
                          </div>
                        </div>
                        <div className='ry_reviewrightbottom flex-vertical'>
                          <h1 className='ry_h3-display1 text-violet'>{data.percentage}%</h1>
                          <p className='ry_p-style2'>Ends in {data.daysLeft} days</p>
                        </div>
                      </div>
                      <div className='ry_options'>
                        <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg' />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='ry_bodycontainer_right'>
                  <div className='card_dashboard _w-100'>
                    <div className='w-form'>
                      <form>
                        <div className='ry_cardtop'>
                          <div className='div-block-395'>
                            <div className='card_dashboard-label'>Goals Summary</div>
                          </div>
                        </div>
                        <div className='ry_cardcontent-style1'>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0 bg-green' />{' '}
                              <p className='ry_p-style1 mb-0'>On Track</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>
                                {
                                  this.props.goals.filter(
                                    (goal) => goal.achieved || goal.percentage < 60,
                                  ).length
                                }
                              </p>
                            </div>
                          </div>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0 bg-yellow' />
                              <p className='ry_p-style1 mb-0'>Behind</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>
                                {
                                  this.props.goals.filter(
                                    (goal) =>
                                      !goal.achieved &&
                                      goal.percentage >= 60 &&
                                      goal.percentage < 80,
                                  ).length
                                }
                              </p>
                            </div>
                          </div>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0 bg-red' />
                              <p className='ry_p-style1 mb-0'>At Risk</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>
                                {
                                  this.props.goals.filter(
                                    (goal) => !goal.achieved && goal.percentage >= 80,
                                  ).length
                                }
                              </p>
                            </div>
                          </div>
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
  Client.initiateWatch('Goals');
  Goalss.initiateWatch('Goals');
  Notes.initiateWatch('Goals');
  return {
    goals: Goalss.Data,
    notes: Notes.Data,
    Client: Client.user(),
  };
})(Goals);
