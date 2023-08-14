import { TeamsCollection } from '../../db';
import { GetTeams, AddTeam } from '../../common';
import RedisVent from '../RedisVent';
import moment from 'moment';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    [GetTeams]: function (data) {
      if (!data || data === '') {
        const test = TeamsCollection.find({})
          .fetch()
          .map((data) => data);
        return test;
      } else {
        const test = TeamsCollection.find({ departmentName: data })
          .fetch()
          .map((data) => data);
        return test;
      }
    },
    [AddTeam]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = TeamsCollection.insert(data);
        data._id = id._str;
        console.info(
          'Teams.js call[%s]: %s at %s',
          AddTeam,
          `New Teams Added!`,
          moment(data.timestamp),
        );
        RedisVent.Teams.triggerInsert('teams', '123', data);
      } catch (error) {
        console.error(AddTeam, error);
      }
    },
  });
}
