import { EmployeesCollection } from '../../db';
import { GetEmployees, AddMember } from '../../common';
import RedisVent from '../RedisVent';
import moment from 'moment';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    [GetEmployees]: function (data) {
      if (!data || data === '') {
        const test = EmployeesCollection.find({})
          .fetch()
          .map((data) => data);
        return test;
      } else {
        const test = EmployeesCollection.find({ department: data })
          .fetch()
          .map((data) => data);
        return test;
      }
    },
    [AddMember]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = EmployeesCollection.insert(data);
        data._id = id._str;
        console.info(
          'Member.js call[%s]: %s at %s',
          AddMember,
          `New Employees Added!`,
          moment(data.timestamp),
        );
        RedisVent.Employees.triggerInsert('employees', '123', data);
      } catch (error) {
        console.error(AddMember, error);
      }
    },
  });
}
