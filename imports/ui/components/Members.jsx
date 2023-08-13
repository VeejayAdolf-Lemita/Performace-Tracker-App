import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Employees from '../../api/classes/client/review/Employees';

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      name: '',
      position: '',
      productivity: '',
      department: 'Graphic Design',
      salary: '',
      memberFilter: '',
    };
    Employees.setWatcher(this, 'Members');
  }

  componentDidMount() {
    Employees.getEmployees();
  }

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePositionChange = (event) => {
    this.setState({ position: event.target.value });
  };

  handleProductivityChange = (event) => {
    this.setState({ productivity: event.target.value });
  };

  handleDepartmentChange = (event) => {
    this.setState({ department: event.target.value });
  };

  handleSalaryChange = (event) => {
    this.setState({ salary: event.target.value });
  };

  handleSubmit = () => {
    const { name, position, productivity, department, salary, memberFilter } = this.state;

    const newMember = {
      name,
      position,
      salary,
      employmentStatus: 'Active',
      productivity,
      department,
    };

    Employees.addMember(newMember);
    Employees.getEmployees();

    this.setState({
      name: '',
      position: '',
      productivity: '',
      salary: '',
    });
  };

  handleMemberFilter = (event) => {
    this.setState({ memberFilter: event.target.value });
  };

  handleFilterMember = () => {
    Employees.getEmployees(this.state.memberFilter);
  };

  render() {
    const { openModal, name, position, productivity, department, salary, memberFilter } =
      this.state;
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
                      value={name}
                      onChange={this.handleNameChange}
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
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
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Productivity</label>
                  <div className='form-control'>
                    <input
                      type='number'
                      className='ry_text-field-style1 w-input'
                      value={productivity}
                      onChange={this.handleProductivityChange}
                      required
                    />
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Department</label>
                  <div className='form-control'>
                    <select
                      className='ry_selectfieldsmall w-select'
                      style={{ width: '100%', height: '30px', fontSize: '1rem' }}
                      value={department}
                      onChange={this.handleDepartmentChange}
                    >
                      <option value='Graphic Design'>Graphic Design</option>
                      <option value='Web Development'>Web Development</option>
                      <option value='Human Resources'>Human Resources</option>
                    </select>
                  </div>
                </div>
                <div className='form-row'>
                  <label className='ry_field-label-style1'>Earnings</label>
                  <div className='form-control'>
                    <input
                      type='number'
                      className='ry_text-field-style1 w-input'
                      value={salary}
                      onChange={this.handleSalaryChange}
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
                <a href='#' className='ry_breadcrumbs-style1'>
                  People
                </a>
                <div className='ry_breadcrumbsdivider'>/</div>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Members
                </a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Members</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <select
                    className='ry_selectfieldsmall w-select'
                    style={{ width: '250px', height: '30px', fontSize: '1rem' }}
                    onChange={this.handleMemberFilter}
                    value={memberFilter}
                  >
                    <option value=''>All Members</option>
                    <option value='Graphic Design'>Graphic Design</option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Human Resources'>Human Resources</option>
                  </select>
                </div>
                <div className='ry_bodytop_right'>
                  <div
                    className='ry_icon-btn-style1 light mr-10 w-inline-block'
                    onClick={this.handleFilterMember}
                  >
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Filter</div>
                  </div>
                  <div
                    className='ry_icon-btn-style1 mr-10 w-inline-block'
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
                              <div>Team</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col _20'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Office Time</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col _15'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Productivity</div>
                            </div>
                          </div>
                        </div>
                        <div className='rb-table-col _15'>
                          <div className='rb-table-cell'>
                            <div className='table-header-div'>
                              <div>Earnings ($)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.props.employee.map((data) => (
                        <div className='rb-table-content' key={data._id}>
                          <div href='#' className='rb-table-row'>
                            <div className='rb-table-col stretch'>
                              <div className='rb-table-cell'>
                                <div className='div-block-398'>
                                  <div className='ry_person-style2'>
                                    <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png' />
                                  </div>
                                  <div className='table-text'>
                                    <div>{data.name}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{data.department}</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _20'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>09:00h</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text text-green'>
                                  <div>{data.productivity}%</div>
                                </div>
                              </div>
                            </div>
                            <div className='rb-table-col _15'>
                              <div className='rb-table-cell'>
                                <div className='table-text'>
                                  <div>{data.salary}$</div>
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
    );
  }
}

export default withTracker(() => {
  Employees.initiateWatch('Members');
  return {
    employee: Employees.Data,
  };
})(Members);
