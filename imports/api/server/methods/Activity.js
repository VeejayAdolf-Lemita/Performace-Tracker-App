import { ActivityCollection } from '../../db';
import { GetActivity } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActivity]: function () {
      const test = ActivityCollection.find({})
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
