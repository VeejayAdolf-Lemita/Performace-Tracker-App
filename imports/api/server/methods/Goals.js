import { GoalsCollection } from '../../db';
import { GetGoals } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetGoals]: function (filter) {
      const test = GoalsCollection.find({ filter: filter })
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
