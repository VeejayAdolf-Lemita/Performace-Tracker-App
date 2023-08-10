import { ReviewCollection } from '../../db';
import {
  GetReviews,
  AddReview,
  GetUserReview,
  GetUserRecieve,
  GetTopMostAppreciated,
} from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetReviews]: function (data) {
      return ReviewCollection.find({ share: data })
        .fetch()
        .map((data) => data);
    },

    [GetUserReview]: function (data) {
      const userReviews = ReviewCollection.find({ reviewFrom: data });
      const userReviewCount = userReviews.count();
      return {
        count: userReviewCount,
      };
    },

    [GetUserRecieve]: function (data) {
      const userRecieve = ReviewCollection.find({ reviewTo: data });
      const userRecieveCount = userRecieve.count();
      return {
        count: userRecieveCount,
      };
    },

    [GetTopMostAppreciated]: async function () {
      const pipeline = [
        // Group reviews by 'reviewTo' and calculate the count
        {
          $group: {
            _id: '$reviewTo',
            count: { $sum: 1 },
          },
        },
        // Sort the groups by count in descending order
        {
          $sort: { count: -1 },
        },
        // Limit the result to the top 5 groups
        {
          $limit: 5,
        },
        // Project the desired fields for the final output
        {
          $project: {
            _id: 0, // Exclude '_id'
            name: '$_id', // Rename '_id' to 'name'
            count: 1, // Include 'count'
          },
        },
      ];

      // Perform the aggregation pipeline and convert the result to an array
      const mostAppreciatedCursor = await ReviewCollection.rawCollection()
        .aggregate(pipeline)
        .toArray();

      return mostAppreciatedCursor;
    },

    [AddReview]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = ReviewCollection.insert(data);
        data._id = id._str;
        console.info(
          'registry.js call[%s]: %s at %s',
          AddReview,
          `New Task Added! ID: ${data._id}`,
          moment(data.timestamp),
        );
        RedisVent.Reviews.triggerInsert('reviews', '123', data);
      } catch (error) {
        console.error(AddReview, error);
      }
    },
  });
}
