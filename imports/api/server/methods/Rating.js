import { RatingCollection } from '../../db';
import { GetRating } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetRating]: function (filter) {
      const test = RatingCollection.find({ filter: filter })
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
