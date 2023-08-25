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
    [GetReviews]: function ({ datas, lastbasis }) {
      const pipeline = [];
      const match = { index1: { $regex: datas } };
      const project = {
        _id: 1,
        reviewFrom: 1,
        reviewTo: 1,
        message: 1,
        index1: 1,
        reacts: 1,
        timestamp: 1,
        createdAt: 1,
      };
      if (lastbasis) match.index1.$lt = lastbasis;
      pipeline.push({ $match: match });
      pipeline.push({ $project: project });
      pipeline.push({ $limit: 4 });
      return ReviewCollection.rawCollection()
        .aggregate(pipeline, { allowDiskUse: true })
        .toArray()
        .then((res) => {
          const retval = {};
          if (res && res.length) {
            retval.data = res.map((d) => ({ ...d, _id: d._id }));
            retval.lastbasis = res[res.length - 1].index1;
          }
          return retval;
        });
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
        data.index1 = `${data.share}${data.timestamp}`;
        const id = ReviewCollection.insert(data);
        console.info(
          'Reviews.js call[%s]: %s at %s',
          AddReview,
          `New Review Added! ID: ${id._str}`,
          moment(data.timestamp),
        );
        RedisVent.Reviews.triggerInsert('reviews', '123', data);
      } catch (error) {
        console.error(AddReview, error);
      }
    },
  });
}
