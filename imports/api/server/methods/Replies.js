import { RepliesCollection } from '../../db';
import { GetReplies } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetReplies]: function (data) {
      const test = RepliesCollection.find({ reviewId: data })
        .fetch()
        .map((data) => data);
      return test;
    },
  });
}
