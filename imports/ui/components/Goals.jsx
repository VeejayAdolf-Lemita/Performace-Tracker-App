import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Goalss from '../../api/classes/client/review/Goals';

class Goals extends Component {
  constructor(props) {
    super(props);
    Goalss.setWatcher(this, 'Goals');
  }

  componentDidMount() {
    Goalss.getGoals();
  }
  render() {
    console.log(this.props.goals);
    return (
      <div className='ry_main-style1'>
        <div className='ry_main-style1_container'>
          <div className='section-style1 mt-0'>
            <div className='ry_dashboard_top mb-10'>
              <div className='ry_breadcrumbs_container mb-0'>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Goals
                </a>
                <div className='ry_breadcrumbsdivider'>/</div>
                <a href='#' className='ry_breadcrumbs-style1'>
                  Overview
                </a>
              </div>
              <div className='ry_headercontainer'>
                <h1 className='ry_h1-display1 text-white'>Goals</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <h1 className='ry_h2-display1'>All Goals</h1>
                  <div className='ry_arrowdown'>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f22d72fcff739ae70c277_icon_arrow.svg'
                      loading='lazy'
                      alt=''
                    />
                  </div>
                </div>
                <div className='ry_bodytop_right'>
                  <a href='#' className='ry_icon-btn-style1 light mr-10 w-inline-block'>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eef8aec75fb8b58e0fc0c_icon_filter.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Filter</div>
                  </a>
                  <a
                    data-w-id='bfd1bb1a-b812-55c4-35f4-30b7f4515628'
                    href='#'
                    className='ry_icon-btn-style1 w-inline-block'
                  >
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Add</div>
                  </a>
                </div>
              </div>
              <div className='ry_bodycontainer'>
                <div className='ry_bodycontainer_left'>
                  {this.props.goals.map((data) => (
                    <div className='ry_review' key={data._id}>
                      <div className='ry_reviewleft'>
                        <div className='ry_goalsstatus' />
                      </div>
                      <div className='ry_reviewright flex-horizontal'>
                        <div className='ry_reviewrighttop flex-vertical'>
                          <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                            {data.name}
                          </p>
                          <div className='ry_reviewmicro mt-10'>
                            <div className='ry_reviewmicro_icon'>
                              <img
                                src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f3b7ec8d98bb32195c8ea_review_02.svg'
                                loading='lazy'
                                alt=''
                              />
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
                        <img
                          src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648048a50a92ccf7494e67f5_goals_01.svg'
                          loading='lazy'
                          alt=''
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className='ry_bodycontainer_right'>
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
                          <div className='div-block-395'>
                            <div className='card_dashboard-label'>Goals Summary</div>
                          </div>
                        </div>
                        <div className='ry_cardcontent-style1'>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0' />
                              <p className='ry_p-style1 mb-0'>On Track</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>4</p>
                            </div>
                          </div>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0 bg-yellow' />
                              <p className='ry_p-style1 mb-0'>Behind</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>2</p>
                            </div>
                          </div>
                          <div className='ry_cardcontent_row no-border'>
                            <div className='ry_cardcontent_rowcol'>
                              <div className='ry_goalsstatus mt-0 bg-red' />
                              <p className='ry_p-style1 mb-0'>At Risk</p>
                            </div>
                            <div className='ry_cardcontent_rowcol _w-10'>
                              <p className='ry_p-style1 mb-0 text-darkblue'>1</p>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div
                        className='w-form-done'
                        tabIndex={-1}
                        role='region'
                        aria-label='Email Form 2 success'
                      >
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div
                        className='w-form-fail'
                        tabIndex={-1}
                        role='region'
                        aria-label='Email Form 2 failure'
                      >
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
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
  Goalss.initiateWatch('Goals');
  return {
    goals: Goalss.Data,
  };
})(Goals);
