import { RepliesCollection } from '../../db';
import { GetReplies, AddReply } from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetReplies]: function (data) {
      const test = RepliesCollection.find({ reviewId: data })
        .fetch()
        .map((data) => data)
        .sort((a, b) => b.timestamp - a.timestamp);

      return test;
    },
    [AddReply]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = RepliesCollection.insert(data);
        data._id = id._str;
        console.info(
          'Replies.js call[%s]: %s at %s',
          AddReply,
          `New Reply Added! ID: ${data._id}`,
          moment(data.timestamp),
        );
        RedisVent.Replies.triggerInsert('replies', '123', data);
      } catch (error) {
        console.error(AddReply, error);
      }
    },
  });
}
