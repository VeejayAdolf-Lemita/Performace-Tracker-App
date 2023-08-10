import React, { Component } from 'react';

export default class Feedback extends Component {
  render() {
    return (
      <div className='ry_main-style1'>
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
                <h1 className='ry_h1-display1 text-white'>360° Feedback</h1>
              </div>
            </div>
            <div className='ry_body pb-0'>
              <div className='ry_bodytop'>
                <div className='ry_bodytop_left'>
                  <h1 className='ry_h2-display1 mr-10'>Results</h1>
                  <p className='ry_p-style1 mb-0 text-darkblue text-semibold'>
                    as of Jun 5, 2023, 9:07 AM
                  </p>
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
                  <a href='#' className='ry_icon-btn-style1 outline mr-10 w-inline-block'>
                    <img
                      src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648082396af282519c4e2818_report_01.svg'
                      loading='lazy'
                      alt=''
                      className='icon-btn_asset'
                    />
                    <div>Export</div>
                  </a>
                </div>
              </div>
              <div className='ry_bodycontainer'>
                <div className='ry_bodycontainer_left'>
                  <div className='ry_review flex-vertical'>
                    <div className='ry_cardtop'>
                      <div className='card_dashboard-label'>Reviewee Notes</div>
                    </div>
                    <div className='ry_cardbody'>
                      <p className='ry_p-style1'>I agree/ don’t agree etc.</p>
                    </div>
                  </div>
                  <div className='ry_review flex-vertical'>
                    <div className='ry_cardtop'>
                      <div className='card_dashboard-label'>Summary</div>
                    </div>
                    <div className='ry_barchart'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648091f073462c143542c0a5_chart_02.svg'
                        loading='lazy'
                        alt=''
                        className='image-100'
                      />
                    </div>
                  </div>
                  <div className='ry_review flex-vertical'>
                    <div className='ry_cardtop'>
                      <div className='card_dashboard-label'>Communication</div>
                    </div>
                    <div className='ry_barchart'>
                      <img
                        src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/648091ef21bbdb358a883202_chart_03.svg'
                        loading='lazy'
                        alt=''
                        className='image-100'
                      />
                    </div>
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
                        <h1 className='ry_h3-display1'>John Smith</h1>
                        <div className='ry_p-style1'>Graphic Designer</div>
                      </div>
                    </div>
                    <div className='ry_cardcontent-style1 mt-10'>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Hire Date</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue'>21 Oct, 2021</p>
                        </div>
                      </div>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Review Cycle</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue align-right'>
                            Jan 1 - Mar 31, 2023
                          </p>
                        </div>
                      </div>
                      <div className='ry_linedivider' />
                      <div className='ry_cardtop'>
                        <div className='div-block-395'>
                          <div className='card_dashboard-label'>Survey Progress</div>
                        </div>
                      </div>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Invited</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue'>11</p>
                        </div>
                      </div>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Done</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue'>10 (91%)</p>
                        </div>
                      </div>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Not Responded</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue'>1 (9%)</p>
                        </div>
                      </div>
                      <div className='ry_cardcontent_row no-border'>
                        <div className='ry_cardcontent_rowcol'>
                          <p className='ry_p-style1 mb-0'>Declined</p>
                        </div>
                        <div className='ry_cardcontent_rowcol justfiy-right'>
                          <p className='ry_p-style1 mb-0 text-darkblue'>0</p>
                        </div>
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
