import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import '../stylesheets/dashboard.css';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

export default class Dashboard extends Component {
  render() {
    return (
      <div className='ry_app-main-wrapper-style2'>
        <Header />
        <div data-w-id='ac3afbcf-65d0-1e1e-7bef-fe7812f0d460' className='icon_main-menu'>
          <img
            src='https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg'
            loading='lazy'
            alt=''
          />
        </div>
        <div className='ry_main-section-style1'>
          <SideNav />
          <Outlet />
        </div>
      </div>
    );
  }
}
