import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Bonus from '../../api/classes/client/bonuses/Bonus';

class Bonuses extends Component {
  constructor(props) {
    super(props);

    Bonus.setWatcher(this, 'Bonuses');
    this.state = {
      openModal: false,
      bonusesFilter: '',
      setRelease: '',
      dateReleased: '',
      employeeName: '',
      status: 'Pending',
      earned: '',
      message: '',
    };
  }

  componentDidMount() {
    Bonus.listen();
    Bonus.getBonuses(this.state.bonusesFilter);
  }

  handleLoadBonuses = () => {
    Bonus.getBonuses(this.state.bonusesFilter);
  };

  handleBonusChange = (event) => {
    this.setState({ bonusesFilter: event.target.value });
  };

  handleFilterBonus = () => {
    Bonus.clearDB();
    Bonus.getBonuses(this.state.bonusesFilter);
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleReleaseDate = (event) => {
    const selectedDate = new Date(event.target.value);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = selectedDate.toLocaleDateString('en-US', options);

    this.setState({
      setRelease: event.target.value,
      dateReleased: formattedDate,
    });
  };

  handleEmployeeChange = (event) => {
    this.setState({ employeeName: event.target.value });
  };

  handleStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  handleEarnedChange = (event) => {
    this.setState({ earned: event.target.value });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = () => {
    const { dateReleased, employeeName, status, earned, message } = this.state;
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

    const newBonus = {
      employeeName,
      earned,
      message,
      status,
      dateReleased,
      createdAt: formatted_date,
    };

    Bonus.addBonus(newBonus);
    this.setState({
      employeeName: '',
      status: 'Pending',
      message: '',
      dateReleased: '',
      earned: '',
      setRelease: '',
    });
  };

  render() {
    const { bonusesFilter, openModal, setRelease, employeeName, status, earned, message } =
      this.state;
    console.log(this.props.bonus);
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
                  <label className='ry_field-label-style1'>Employee Name</label>
                  <div className='form-control'>
                    <input
                      className='ry_text-field-style1 w-input'
                      onChange={this.handleEmployeeChange}
                      value={employeeName}
                      required
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <label className='ry_field-label-style1'>Date of Release</label>
                  <div className='form-control'>
                    <input
                      type='date'
                      className='ry_text-field-style1 w-input'
                      required
                      onChange={this.handleReleaseDate}
                      value={setRelease}
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Status</label>
                  <select
                    className='ry_selectfieldsmall w-select'
                    style={{ width: '100%', height: '30px', fontSize: '1rem' }}
                    onChange={this.handleStatusChange}
                    value={status}
                  >
                    <option value='Pending'>Pending</option>
                    <option value='Canceled'>Canceled</option>
                    <option value='Released'>Released</option>
                  </select>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Earned</label>
                  <div className='form-control'>
                    <input
                      type='number'
                      className='ry_text-field-style1 w-input'
                      value={earned}
                      onChange={this.handleEarnedChange}
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Message</label>
                  <div className='form-control'>
                    <input
                      className='ry_text-field-style1 w-input'
                      value={message}
                      onChange={this.handleMessageChange}
                      required
                    />
                  </div>
                </div>

                <div className='ry_form-btn_containers' onClick={this.handleSubmit}>
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
                <a className='ry_breadcrumbs-style1'>Bonus</a>
                <div className='ry_breadcrumbsdivider'>/</div>
                <a className='ry_breadcrumbs-style1'>Overview</a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Bonus</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <select
                    className='ry_selectfieldsmall w-select'
                    style={{ width: '250px', height: '30px', fontSize: '1rem' }}
                    onChange={this.handleBonusChange}
                    value={bonusesFilter}
                  >
                    <option value=''>All Bonuses</option>
                    <option value='Released'>Released</option>
                    <option value='Pending'>Pending</option>
                    <option value='Canceled'>Canceled</option>
                  </select>
                </div>
                <div className='ry_bodytop_right'>
                  <div
                    className='ry_icon-btn-style1 light mr-10 w-inline-block'
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleFilterBonus}
                  >
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Filter</div>
                  </div>
                  <div className='ry_icon-btn-style1 w-inline-block' onClick={this.handleOpenModal}>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Add</div>
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
                              <div>Earned ($)</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col stretch'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Message</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col _15'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Status</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col _15'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Date of Release</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Mapping of bonuses*/}
                      {this.props.bonus.map((data) => (
                        <div className='rb-table-content' key={data._id}>
                          <div className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{data.employeeName}</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{`${data.earned} $`}</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{data.message}</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div
                                  className='ry_badge-style1'
                                  style={{
                                    background:
                                      data.status === 'Pending'
                                        ? '#ffa50057'
                                        : data.status === 'Canceled'
                                        ? '#ff090957'
                                        : '',

                                    minWidth: '80px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {data.status}
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{data.dateReleased}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        className='ry_icon-btn-style1 w-inline-block'
                        style={{ cursor: 'pointer' }}
                        onClick={this.handleLoadBonuses}
                      >
                        Load More
                      </div>
                      {/*End of mapping bonuses*/}
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
  Bonus.initiateWatch('Bonuses');
  return {
    bonus: Bonus.Data,
  };
})(Bonuses);
