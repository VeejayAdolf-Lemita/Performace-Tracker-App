import React, { Component } from 'react';
import Client from '../api/classes/client/Client';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reset from './pages/Reset';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import Review from './components/Review.';
import Goals from './components/Goals';
import Bonuses from './components/Bonuses';
import Members from './components/Members';
import Teams from './components/Teams';
import Reports from './components/Reports';
import Timesheet from './components/Timesheet';
import Timeline from './components/Timeline';
import Attendance from './components/Attendance';
import ActivityLevel from './components/ActivityLevel';
import Feedback from './components/Feedback';
import Insights from './components/Insights';
import Settings from './components/Settings';
import Notfound from './pages/Notfound';

class App extends Component {
  constructor(props) {
    super(props);
    Client.setWatcher(this, 'App');
  }

  render() {
    Client.initiateWatch('App');
    return (
      <Router>
        <Routes>
          <Route path='/' element={this.props.isReady ? <Dashboard /> : <Login />}>
            <Route path='' element={<Home />} />
            <Route path='review' element={<Review />} />
            <Route path='goals' element={<Goals />} />
            <Route path='bonuses' element={<Bonuses />} />
            <Route path='members' element={<Members />} />
            <Route path='teams' element={<Teams />} />
            <Route path='reports' element={<Reports />} />
            <Route path='timesheets' element={<Timesheet />} />
            <Route path='timeline' element={<Timeline />} />
            <Route path='attendance' element={<Attendance />} />
            <Route path='activity-level' element={<ActivityLevel />} />
            <Route path='feedback' element={<Feedback />} />
            <Route path='insights' element={<Insights />} />
            <Route path='settings' element={<Settings />} />
          </Route>
          <Route path='login' element={!this.props.isReady ? <Login /> : <Login />} />
          <Route path='sign-up' element={<Signup />} />
          <Route path='reset-password' element={<Reset />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    );
  }
}

export default withTracker(() => {
  return { isReady: Client.user() };
})(App);
