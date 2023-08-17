import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import TeamsWatcher from '../../api/classes/client/teams/Teams';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsFilter: '',
      openModal: false,
      member: [],
      name: '',
      position: '',
      departmentName: '',
    };
    TeamsWatcher.setWatcher(this, 'Teams');
  }

  componentDidMount() {
    TeamsWatcher.getTeams();
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleTeamFilter = (event) => {
    this.setState({ teamsFilter: event.target.value });
  };

  handleFilterTeam = () => {
    TeamsWatcher.getTeams(`${this.state.teamsFilter}`);
  };

  handleDepartmentChange = (event) => {
    this.setState({ departmentName: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePositionChange = (event) => {
    this.setState({ position: event.target.value });
  };

  handleAddMember = () => {
    const newMember = {
      name: this.state.name,
      position: this.state.position,
    };
    this.setState((prevState) => ({
      member: [...prevState.member, newMember],
      name: '',
      position: '',
    }));
    TeamsWatcher.getTeams();
  };

  handleAddTeam = () => {
    const { departmentName, member } = this.state;
    const newTeam = {
      departmentName,
      members: member,
    };
    TeamsWatcher.addTeam(newTeam);
    TeamsWatcher.getTeams();
    this.setState({
      departmentName: '',
      member: [],
    });
  };

  render() {
    const { teamsFilter, openModal, name, position, departmentName } = this.state;
    console.log(this.state.member);
    return (
      <div className='ry_main-style1'>
        <div className='ry_add-review-popup' style={{ display: openModal ? 'flex' : 'none' }}>
          <div className='ry_popup'>
            <div className='ry_popup-top'>
              <div className='ry_popup-header'>Add Team</div>
              <div className='ry_icon-close' onClick={this.handleCloseModal}>
                <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
              </div>
            </div>
            <div className='w-form'>
              <form className='form-2'>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Team Name</label>
                  <div className='form-control'>
                    <input
                      className='ry_text-field-style1 w-input'
                      value={departmentName}
                      onChange={this.handleDepartmentChange}
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Members:</label>
                </div>
                <div
                  className='form-row'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    gap: '10%',
                  }}
                >
                  <div style={{ width: '40%' }}>
                    <label className='ry_field-label-style1'>Name</label>
                    <div className='form-control'>
                      <input
                        className='ry_text-field-style1 w-input'
                        value={name}
                        onChange={this.handleNameChange}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ width: '40%' }}>
                    <label className='ry_field-label-style1'>Position</label>
                    <div className='form-control'>
                      <input
                        className='ry_text-field-style1 w-input'
                        value={position}
                        onChange={this.handlePositionChange}
                        required
                      />
                    </div>
                  </div>
                  <div
                    className='ry_btn-style1 w-button'
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleAddMember}
                  >
                    Add
                  </div>
                </div>
                {this.state.member.map((data, index) => (
                  <div key={index}>{`${data.name}(${data.position})`}</div>
                ))}

                <div className='ry_form-btn_containers' onClick={this.handleAddTeam}>
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
                <div className='ry_breadcrumbs-style1'>People</div>
                <div className='ry_breadcrumbsdivider'>/</div>
                <div className='ry_breadcrumbs-style1'>Teams</div>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Teams</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <select
                    className='ry_selectfieldsmall w-select'
                    style={{ width: '250px', height: '30px', fontSize: '1rem' }}
                    onChange={this.handleTeamFilter}
                    value={teamsFilter}
                  >
                    <option value=''>All Teams</option>
                    <option value='Graphic Designer'>Graphic Design</option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Human Resources'>Human Resources</option>
                  </select>
                </div>
                <div className='ry_bodytop_right'>
                  <div
                    className='ry_icon-btn-style1 light mr-10 w-inline-block'
                    onClick={this.handleFilterTeam}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                      className='icon-btn_asset'
                    />
                    <div>Filter</div>
                  </div>
                  <div
                    className='ry_icon-btn-style1 mr-10 w-inline-block'
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleOpenModal}
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
                  {this.props.team.map((data) => (
                    <div className='ry_review' key={data._id}>
                      <div className='ry_reviewright flex-horizontal'>
                        <div className='ry_reviewrighttop flex-vertical'>
                          <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                            {data.departmentName}
                          </p>
                        </div>
                        <div className='ry_reviewrightbottom flex-vertical mr-20'>
                          <div className='ry_reviewmicro'>
                            <div className='ry_reviewmicro_icon'>
                              <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648063b66e52ed7caca82b33_teams_01.svg' />
                            </div>
                            <div>{data.members.length}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='ry_bodycontainer_right'>
                  {this.props.team.map((data) => (
                    <div className='card_dashboard _w-100' key={data._id}>
                      <div className='w-form'>
                        <form>
                          <div className='ry_cardtop bordered'>
                            <div className='div-block-395 flex-vertical'>
                              <div className='card_dashboard-label'>Members</div>
                              <div className='card_dashboard-label text-small'>
                                {data.departmentName}
                              </div>
                            </div>
                          </div>
                          <div className='ry_cardcontent-style1'>
                            {data.members.map((member, index) => (
                              <div
                                className='ry_cardcontent_row no-border'
                                key={index}
                                style={{ gap: '3rem' }}
                              >
                                <div className='ry_cardcontent_rowcol'>
                                  <div className='ry_person-style2'>
                                    <img src={member.image} style={{ borderRadius: '50%' }} />
                                  </div>
                                  <p className='ry_p-style1 mb-0'>{member.name}</p>
                                </div>
                                <div className='ry_cardcontent_rowcol'>{member.position}</div>
                              </div>
                            ))}
                          </div>
                        </form>
                      </div>
                    </div>
                  ))}
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
  TeamsWatcher.initiateWatch('Teams');
  return {
    team: TeamsWatcher.Data,
  };
})(Teams);
