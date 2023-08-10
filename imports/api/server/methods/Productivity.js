import { ProductivityCollection } from '../../db';
import { GetProductivity } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetProductivity]: function (filter) {
      const test = ProductivityCollection.find({ filter: filter })
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
