import { GoalsCollection } from '../../db';
import { GetGoals, AddGoal } from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetGoals]: async function (data) {
      const today = new Date();

      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);

      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);

      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const formatted_today = `${monthNames[today.getMonth()]} ${addLeadingZero(
        today.getDate(),
      )}, ${today.getFullYear()}`;
      const formatted_weekAgo = `${monthNames[weekAgo.getMonth()]} ${addLeadingZero(
        weekAgo.getDate(),
      )}, ${weekAgo.getFullYear()}`;

      function addLeadingZero(number) {
        return number < 10 ? '0' + number : number;
      }

      if (data === 'Today') {
        const currentDate = new Date(); // Current date

        const pipeline = [
          // Project the required fields
          {
            $project: {
              _id: 1, // Exclude '_id'
              name: 1,
              goalStart: 1,
              goalEnd: 1,
              achieved: 1,
              createdAt: 1,
              timestamp: 1,
              daysLeft: {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [{ $toDate: '$goalEnd' }, { $toDate: currentDate }],
                    },
                    24 * 60 * 60 * 1000, // Milliseconds in a day
                  ],
                },
              },
              percentage: {
                $cond: {
                  if: { $eq: ['$achieved', true] },
                  then: 100,
                  else: {
                    $round: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [currentDate, { $toDate: '$goalStart' }],
                              },
                              {
                                $subtract: [{ $toDate: '$goalEnd' }, { $toDate: '$goalStart' }],
                              },
                            ],
                          },
                          100,
                        ],
                      },
                      0, // Round to 0 decimal places
                    ],
                  },
                },
              },
            },
          },
          // Sort the results by 'percentage' in descending order
          {
            $sort: { timestamp: -1 },
          },
          {
            $match: {
              createdAt: formatted_today,
            },
          },
        ];

        // Perform the aggregation pipeline and convert the result to an array
        const topGoalsCursor = await GoalsCollection.rawCollection().aggregate(pipeline).toArray();
        return topGoalsCursor;
      }
      if (data === 'Weekly') {
        const currentDate = new Date(); // Current date

        const pipeline = [
          // Project the required fields
          {
            $project: {
              _id: 1, // Exclude '_id'
              name: 1,
              goalStart: 1,
              goalEnd: 1,
              achieved: 1,
              createdAt: 1,
              timestamp: 1,
              daysLeft: {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [{ $toDate: '$goalEnd' }, { $toDate: currentDate }],
                    },
                    24 * 60 * 60 * 1000, // Milliseconds in a day
                  ],
                },
              },
              percentage: {
                $cond: {
                  if: { $eq: ['$achieved', true] },
                  then: 100,
                  else: {
                    $round: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [currentDate, { $toDate: '$goalStart' }],
                              },
                              {
                                $subtract: [{ $toDate: '$goalEnd' }, { $toDate: '$goalStart' }],
                              },
                            ],
                          },
                          100,
                        ],
                      },
                      0, // Round to 0 decimal places
                    ],
                  },
                },
              },
            },
          },
          // Sort the results by 'percentage' in descending order
          {
            $sort: { timestamp: -1 },
          },
          {
            $match: {
              createdAt: {
                $gte: formatted_weekAgo,
              },
            },
          },
        ];

        // Perform the aggregation pipeline and convert the result to an array
        const topGoalsCursor = await GoalsCollection.rawCollection().aggregate(pipeline).toArray();
        return topGoalsCursor;
      } else {
        const currentDate = new Date(); // Current date

        const pipeline = [
          // Project the required fields
          {
            $project: {
              _id: 1, // Exclude '_id'
              name: 1,
              goalStart: 1,
              goalEnd: 1,
              achieved: 1,
              createdAt: 1,
              timestamp: 1,
              daysLeft: {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [{ $toDate: '$goalEnd' }, { $toDate: currentDate }],
                    },
                    24 * 60 * 60 * 1000, // Milliseconds in a day
                  ],
                },
              },
              percentage: {
                $cond: {
                  if: { $eq: ['$achieved', true] },
                  then: 100,
                  else: {
                    $round: [
                      {
                        $multiply: [
                          {
                            $divide: [
                              {
                                $subtract: [currentDate, { $toDate: '$goalStart' }],
                              },
                              {
                                $subtract: [{ $toDate: '$goalEnd' }, { $toDate: '$goalStart' }],
                              },
                            ],
                          },
                          100,
                        ],
                      },
                      0, // Round to 0 decimal places
                    ],
                  },
                },
              },
            },
          },
          // Sort the results by 'percentage' in descending order
          {
            $sort: { timestamp: -1 },
          },
        ];

        // Perform the aggregation pipeline and convert the result to an array
        const topGoalsCursor = await GoalsCollection.rawCollection().aggregate(pipeline).toArray();
        return topGoalsCursor;
      }
    },
    [AddGoal]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = GoalsCollection.insert(data);
        data._id = id._str;
        console.info(
          'Goal.js call[%s]: %s at %s',
          AddGoal,
          `New Goal Added!`,
          moment(data.timestamp),
        );
        RedisVent.Goals.triggerInsert('goals', '123', data);
      } catch (error) {
        console.error(AddGoal, error);
      }
    },
  });
}
