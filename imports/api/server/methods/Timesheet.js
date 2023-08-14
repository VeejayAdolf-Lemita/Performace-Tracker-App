import { AttendanceCollection } from '../../db';
import { GetTimesheet } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetTimesheet]: function (data) {
      if (!data || data === '') {
        const pipeline = [
          {
            $project: {
              Name: '$employeeName',
              Team: '$department',
              Date: '$date',
              OfficeTime: {
                $concat: ['$timeIn', ' - ', '$timeOut'],
              },
              Productivity: '$productivity',
              Earnings: '$salary',
              ActiveTime: '$activeTime',
            },
          },
          {
            $addFields: {
              BreakTime: {
                $subtract: [
                  {
                    $convert: {
                      input: '$breakTimeEnd',
                      to: 'date',
                    },
                  },
                  {
                    $convert: {
                      input: '$breakTimeStart',
                      to: 'date',
                    },
                  },
                ],
              },
              EffectiveOfficeTime: {
                $let: {
                  vars: {
                    breakDuration: {
                      $divide: [
                        {
                          $subtract: [
                            {
                              $convert: {
                                input: '$breakTimeEnd',
                                to: 'date',
                              },
                            },
                            {
                              $convert: {
                                input: '$breakTimeStart',
                                to: 'date',
                              },
                            },
                          ],
                        },
                        60000, // Convert milliseconds to minutes
                      ],
                    },
                  },
                  in: {
                    $let: {
                      vars: {
                        officeDuration: {
                          $divide: [
                            {
                              $subtract: [
                                {
                                  $convert: {
                                    input: '$timeOut',
                                    to: 'date',
                                  },
                                },
                                {
                                  $convert: {
                                    input: '$timeIn',
                                    to: 'date',
                                  },
                                },
                              ],
                            },
                            60000, // Convert milliseconds to minutes
                          ],
                        },
                      },
                      in: {
                        $subtract: ['$officeDuration', '$$breakDuration'],
                      },
                    },
                  },
                },
              },
            },
          },
        ];

        const collection = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(collection);
        return collection;
      } else {
        const pipeline = [
          {
            $match: { date: data },
          },
          {
            $project: {
              Name: '$employeeName',
              Team: '$department',
              Date: '$date',
              OfficeTime: {
                $concat: ['$timeIn', ' - ', '$timeOut'],
              },
              Productivity: '$productivity',
              Earnings: '$salary',
              ActiveTime: '$activeTime',
            },
          },
          {
            $addFields: {
              OfficeTime: {
                $subtract: [
                  '$timeOut',
                  {
                    $add: [
                      '$timeIn',
                      {
                        $divide: [
                          {
                            $multiply: [
                              {
                                $convert: {
                                  input: '$breakTime',
                                  to: 'number',
                                },
                              },
                              60,
                            ],
                          },
                          1,
                        ],
                      },
                    ],
                  },
                ],
              },
              OfficeTime: {
                $ifNull: ['$OfficeTime', 0],
              },
            },
          },
        ];

        const collection = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(collection);
        return collection;
      }
    },
  });
}
