import { FeedbackCollection } from '../../db';
import { GetFeedback } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetFeedback]: function (data) {
      const test = FeedbackCollection.find({ name: data }).fetch();

      if (test.length === 0) {
        throw new Meteor.Error('no-results', 'No feedback found for the given name');
      }

      return test;
    },
  });
}
