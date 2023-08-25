import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Client from '../../api/classes/client/Client';
import Reviews from '../../api/classes/client/review/Reviews';
import Employees from '../../api/classes/client/review/Employees';
import Replies from '../../api/classes/client/review/Replies';

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

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      replyModal: false,
      selectedOption: 'Entire Company',
      inputValue: '',
      suggestions: [],
      message: '',
      filterReview: 'Entire Company',
      reviewId: '',
      replyTo: '',
      replyMessage: '',
    };
    Client.setWatcher(this, 'Reviews');
    Reviews.setWatcher(this, 'Reviews');
    Employees.setWatcher(this, 'Reviews');
    Replies.setWatcher(this, 'Review');
  }

  componentDidMount() {
    Reviews.listen();
    Reviews.getReviewEntireCompany(this.state.filterReview);
    Reviews.getUserReview(`${this.props.Client.profile.username}`);
    Reviews.getUserRecieve(`${this.props.Client.profile.username}`);
    Reviews.getMostAppreciated();
    Employees.getEmployees();
  }

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  handleLoadReview = () => {
    Reviews.getReviewEntireCompany(this.state.filterReview);
  };

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleReplyOpenModal = (reviewId, replyTo) => () => {
    Replies.getReplies(reviewId);
    this.setState({ replyModal: true, reviewId, replyTo, replyMessage: '' });
  };

  handleReplyCloseModal = () => {
    this.setState({ replyModal: false, replyMessage: '' });
  };

  handleAddMemberChange = (event) => {
    const searchText = event.target.value;

    this.setState({
      inputValue: searchText,
      suggestions: this.props.employees
        .filter((employee) => employee.name.toLowerCase().startsWith(searchText))
        .map((employee) => employee.name),
    });
  };

  handleSuggestionClick = (suggestion) => {
    this.setState({
      inputValue: suggestion,
      suggestions: [],
    });
  };

  handleRemove = () => {
    this.setState({
      inputValue: ' ',
      suggestions: [],
    });
  };

  handleMessageChange = (event) => {
    const newValue = event.target.value;
    this.setState({ message: newValue });
  };

  handleAddReview = () => {
    const { inputValue, selectedOption } = this.state;
    const reviewFrom = this.props.Client.profile.username;
    const reviewTo = inputValue;
    const message = this.state.message;
    const reacts = 0;
    const createdAt = formatted_date;
    const share = selectedOption;

    const reviewData = {
      reviewFrom,
      reviewTo,
      message,
      createdAt,
      reacts,
      share,
    };

    Reviews.getReviewEntireCompany(this.state.filterReview);
    Reviews.addReview(reviewData);
    Reviews.getUserReview(`${this.props.Client.profile.username}`);
    Reviews.getMostAppreciated();
    this.setState({
      inputValue: '',
      selectedOption: 'Entire Company',
      message: '',
      openModal: false,
    });
  };

  handleReplySubmit = () => {
    const { replyTo, replyMessage, reviewId } = this.state;

    if (!replyMessage.trim()) {
      return;
    }

    const replyFrom = this.props.Client.profile.username;
    const createdAt = formatted_date;
    const replyData = {
      replyFrom,
      replyTo,
      message: replyMessage,
      createdAt,
      reviewId,
    };
    Replies.addReply(replyData);
    Replies.getReplies(reviewId);

    this.setState({
      replyMessage: '',
      reviewId: '',
      replyTo: '',
    });
  };

  handleReplyMessage = (event) => {
    const replyMessage = event.target.value;
    this.setState({ replyMessage });
  };

  handleReviewFilter = (event) => {
    this.setState({ filterReview: event.target.value });
  };

  handleSubmitFilter = () => {
    const { filterReview } = this.state;
    try {
      Reviews.clearDB();
      Reviews.getReviewEntireCompany(filterReview);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { openModal, selectedOption, filterReview, replyModal } = this.state;
    if (Client.user())
      return (
        <div className='ry_main-style1'>
          <div className='ry_add-review-popup' style={{ display: openModal ? 'flex' : 'none' }}>
            <div className='ry_popup'>
              <div className='ry_popup-top'>
                <div className='ry_popup-header'>Add Review</div>
                <div className='ry_icon-close' onClick={this.handleCloseModal}>
                  <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
                </div>
              </div>
              <div className='w-form'>
                <form className='form-2'>
                  <div className='form-row'>
                    <label className='ry_field-label-style1'>
                      Who is this review review about?
                    </label>
                    <div className='form-control'>
                      <div className='div-block-397'>
                        <input
                          type='text'
                          value={this.state.inputValue}
                          onChange={this.handleAddMemberChange}
                          placeholder='Type a name'
                          className='ry_text-field-style1 w-input'
                        />
                        <div
                          className='ry_icon-btn-style1 bg-cyan w-inline-block'
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg'
                            className='icon-btn_asset'
                          />
                          <div>Select</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ maxHeight: '10rem', overflow: 'auto', minWidth: '100%' }}>
                      {this.state.suggestions.map((suggestion, index) => (
                        <div
                          className='ry_tag-style1'
                          style={{ justifyContent: 'flex-start', cursor: 'pointer' }}
                          key={index}
                          onClick={() => this.handleSuggestionClick(suggestion)}
                        >
                          <div className='ry_tag-style1_image'>
                            <img
                              src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f8ffe4801b4008c8aa_person_03.png'
                              width={15}
                            />
                          </div>
                          <div>{suggestion}</div>
                        </div>
                      ))}
                    </div>
                    {this.state.inputValue.trim() !== '' && (
                      <div className='ry_tag-style1'>
                        <div className='ry_tag-style1_image'>
                          <img
                            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f8ffe4801b4008c8aa_person_03.png'
                            width={15}
                          />
                        </div>
                        <div>{this.state.inputValue}</div>
                        <div
                          className='ry_tag-style1_close'
                          style={{ cursor: 'pointer' }}
                          onClick={this.handleRemove}
                        >
                          <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='form-row'>
                    <label className='ry_field-label-style1'>
                      Who will you share this feedback with?
                    </label>
                    <div className='form-control'>
                      <label className='radio-button-field w-radio'>
                        <input
                          type='radio'
                          value='Entire Company'
                          checked={selectedOption === 'Entire Company'}
                          onChange={this.handleOptionChange}
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        />
                        <span className='radio-button-label w-form-label'>Entire Company</span>
                      </label>
                      <label className='radio-button-field w-radio'>
                        <input
                          type='radio'
                          value='Subject'
                          checked={selectedOption === 'Subject'}
                          onChange={this.handleOptionChange}
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        />

                        <span className='radio-button-label w-form-label'>Subject</span>
                      </label>
                      <label className='radio-button-field w-radio'>
                        <input
                          type='radio'
                          value='Only Subjects Manager'
                          checked={selectedOption === 'Only Subjects Manager'}
                          onChange={this.handleOptionChange}
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        />
                        <span className='radio-button-label w-form-label'>
                          Only Subject's Manager
                        </span>
                      </label>
                      <label className='radio-button-field w-radio'>
                        <input
                          type='radio'
                          value='Do Not Share'
                          checked={selectedOption === 'Do Not Share'}
                          onChange={this.handleOptionChange}
                          style={{ marginRight: '6px', cursor: 'pointer' }}
                        />
                        <span className='radio-button-label w-form-label'>
                          Do Not Share <span className='span-comment'>(Private Note)</span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className='form-row'>
                    <label className='ry_field-label-style1'>Review</label>
                    <div className='form-control'>
                      <textarea
                        maxLength={5000}
                        className='ry_text-area-style1 w-input'
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='ry_form-btn_containers'>
                    <div className='ry_btn-style1 w-button' onClick={this.handleAddReview}>
                      Submit
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='ry_add-review-popup' style={{ display: replyModal ? 'flex' : 'none' }}>
            <div className='ry_popup'>
              <div className='ry_popup-top'>
                <div className='ry_popup-header'>Replies</div>
                <div className='ry_icon-close' onClick={this.handleReplyCloseModal}>
                  <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg' />
                </div>
              </div>
              <div className='w-form'>
                <form className='form-2'>
                  <div
                    className='form-row'
                    style={{ maxHeight: '200px', padding: '2px 3px', overflow: 'auto' }}
                  >
                    {this.props.replies.map((data) => (
                      <div className='ry_review' key={data._id} style={{ width: '100%' }}>
                        <div className='ry_reviewleft'>
                          <div className='ry_person-style2 small'>
                            <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png' />
                          </div>
                          <div className='ry_person-style2 small'>
                            <img src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f93d501d2c45239be8_person_05.png' />
                          </div>
                        </div>

                        <div className='ry_reviewright'>
                          <div className='ry_reviewrighttop'>
                            <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                              {`${data.replyFrom} to ${data.replyTo}`}
                            </p>
                            <p className='ry_p-style2'>{data.createdAt}</p>
                          </div>
                          <p className='ry_p-style1'>
                            <strong>@{data.replyTo}</strong>

                            {` ${data.message}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='form-row'>
                    <label className='ry_field-label-style1'>Message:</label>
                    <div className='form-control'>
                      <textarea
                        maxLength={5000}
                        value={this.state.replyMessage}
                        className='ry_text-area-style1 w-input'
                        onChange={this.handleReplyMessage}
                      />
                    </div>
                  </div>

                  <div className='ry_form-btn_containers'>
                    <div className='ry_btn-style1 w-button' onClick={this.handleReplySubmit}>
                      Submit
                    </div>
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
                    Dashboard
                  </a>
                  <div className='ry_breadcrumbsdivider'>/</div>
                  <a href='#' className='ry_breadcrumbs-style1'>
                    Overview
                  </a>
                </div>
                <div className='ry_headercontainer'>
                  <h1 className='ry_h1-display1 text-white'>Review</h1>
                </div>
              </div>
              <div className='ry_body pb-0'>
                <div className='ry_bodytop'>
                  <div className='ry_bodytop_left'>
                    <select
                      className='ry_selectfieldsmall w-select'
                      style={{ width: '250px', height: '30px', fontSize: '1rem' }}
                      onChange={this.handleReviewFilter}
                      value={filterReview}
                    >
                      <option value='Entire Company'>Entire Company</option>
                      <option value='Subject'>Subject</option>
                      <option value='Only Subjects Manager'>Only Subject's Manager</option>
                      <option value='Do Not Share'>Do Not Share</option>
                    </select>
                  </div>
                  <div
                    className='ry_bodytop_right'
                    onClick={this.handleSubmitFilter}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className='ry_icon-btn-style1 light mr-10 w-inline-block'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                        loading='lazy'
                        alt=''
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
                        loading='lazy'
                        alt=''
                        className='icon-btn_asset'
                      />
                      <div>Add</div>
                    </div>
                  </div>
                </div>

                <div className='ry_bodycontainer'>
                  <div className='ry_bodycontainer_left'>
                    {this.props.reviews.map((data) => (
                      <div className='ry_review' key={data._id}>
                        <div className='ry_reviewleft'>
                          <div className='ry_person-style2 small'>
                            <img
                              src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png'
                              loading='lazy'
                              alt=''
                            />
                          </div>
                          <div className='ry_person-style2 small'>
                            <img
                              src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f93d501d2c45239be8_person_05.png'
                              loading='lazy'
                              alt=''
                            />
                          </div>
                        </div>

                        <div className='ry_reviewright'>
                          <div className='ry_reviewrighttop'>
                            <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                              {`${data.reviewFrom} to ${data.reviewTo}`}
                            </p>
                            <p className='ry_p-style2'>{data.createdAt}</p>
                          </div>
                          <p className='ry_p-style1'>
                            <strong>@{data.reviewTo}</strong>

                            {` ${data.message}`}
                          </p>
                          <div className='ry_reviewrightbottom'>
                            <div className='ry_reviewmicro'>
                              <div className='ry_reviewmicro_icon'>
                                <img
                                  src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7d23b0d34b9eb8af1b_review_01.svg'
                                  loading='lazy'
                                  alt=''
                                />
                              </div>
                              <div>{data.reacts.length}</div>
                            </div>
                            <div
                              className='ry_reviewmicro'
                              onClick={this.handleReplyOpenModal(data._id, data.reviewTo)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className='ry_reviewmicro_icon'>
                                <img
                                  src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7ec8d98bb32195c8ea_review_02.svg'
                                  loading='lazy'
                                  alt=''
                                />
                              </div>
                              <div>View Replies</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className='ry_icon-btn-style1 w-inline-block'
                      style={{ cursor: 'pointer' }}
                      onClick={this.handleLoadReview}
                    >
                      Load More
                    </div>
                  </div>
                  <div className='ry_bodycontainer_right'>
                    <div className='card_dashboard _w-100'>
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
                          <div className='ry_p-style1'>{this.props.Client.profile.position}</div>
                        </div>
                      </div>
                      <div className='card_dashboard_bottom'>
                        <div className='card_dashboard_bottomcol border'>
                          <h1 className='ry_h3-display1 weight-semibold'>
                            {this.props.userReviews}
                          </h1>
                          <div className='ry_p-style1'>Given</div>
                        </div>
                        <div className='card_dashboard_bottomcol'>
                          <h1 className='ry_h3-display1 weight-semibold'>
                            {this.props.userRecieve}
                          </h1>
                          <div className='ry_p-style1'>Received</div>
                        </div>
                      </div>
                    </div>
                    <div className='card_dashboard _w-100'>
                      <div className='w-form'>
                        <form>
                          <div className='ry_cardtop'>
                            <div className='div-block-395'>
                              <div className='ry_iconsmall'>
                                <img
                                  src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7e21c2387b8fe8c2bd_review_03.svg'
                                  loading='lazy'
                                  alt=''
                                />
                              </div>
                              <div className='card_dashboard-label'>Most Appreciated</div>
                            </div>
                          </div>
                          <div className='ry_cardcontent-style1'>
                            {this.props.mostappreciated &&
                              this.props.mostappreciated.map((data, index) => (
                                <div className='ry_cardcontent_row' key={index}>
                                  <div className='ry_cardcontent_rowcol'>
                                    <div className='ry_person-style2'>
                                      <img
                                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f97a36fb101cd48d44_person_04.png'
                                        loading='lazy'
                                        alt=''
                                      />
                                    </div>
                                    <p className='ry_p-style1 mb-0'>{data.name}</p>
                                  </div>
                                  <div className='ry_cardcontent_rowcol _w-10'>
                                    <p className='ry_p-style1 mb-0 text-darkblue'>{data.count}</p>
                                  </div>
                                </div>
                              ))}
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
  Reviews.initiateWatch('Reviews');
  Client.initiateWatch('Reviews');
  Employees.initiateWatch('Reviews');
  Replies.initiateWatch('Reviews');
  return {
    isReady: Client.init(),
    Client: Client.user(),
    reviews: Reviews.Data,
    employees: Employees.Data,
    userReviews: Reviews.UserReviews,
    userRecieve: Reviews.UserRecieve,
    mostappreciated: Reviews.MostAppreciated,
    replies: Replies.Data,
  };
})(Review);
