import { GoalsCollection } from '../../db';
import { GetGoals } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetGoals]: async function () {
      const currentDate = new Date(); // Current date

      const pipeline = [
        // Project the required fields
        {
          $project: {
            _id: 0, // Exclude '_id'
            name: 1,
            goalStart: 1,
            goalEnd: 1,
            achieved: 1,
            createdAt: 1,
            daysLeft: {
              $ceil: {
                $divide: [
                  {
                    $subtract: [{ $toDate: '$goalEnd' }, { $toDate: '$goalStart' }],
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
            status: {
              $switch: {
                branches: [
                  { case: { $gte: ['$percentage', 80] }, then: 'Behind' },
                  { case: { $gte: ['$percentage', 100] }, then: 'At Risk' },
                ],
                default: 'On Track',
              },
            },
          },
        },
        // Sort the results by 'percentage' in descending order
        {
          $sort: { percentage: -1 },
        },
      ];

      // Perform the aggregation pipeline and convert the result to an array
      const topGoalsCursor = await GoalsCollection.rawCollection().aggregate(pipeline).toArray();

      return topGoalsCursor;
    },
  });
}
