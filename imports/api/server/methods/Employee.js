import { EmployeesCollection } from '../../db';
import { GetEmployees } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetEmployees]: function () {
      const test = EmployeesCollection.find({})
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
