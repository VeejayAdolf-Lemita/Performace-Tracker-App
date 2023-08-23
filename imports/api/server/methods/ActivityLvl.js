import { AttendanceCollection } from '../../db';
import { GetActivityLevel } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActivityLevel]: async function ({ gte, lte }) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const pipeline = [
        {
          $match: {
            date: { $gte: new Date(gte), $lte: new Date(lte) },
          },
        },
        {
          $group: {
            _id: {
              employeeName: '$employeeName',
              department: '$department',
            },
            daysData: {
              $push: {
                dayOfWeek: { $dayOfWeek: '$date' },
                activity: '$activity',
                timeIn: '$timeIn',
                timeOut: '$timeOut',
                productivity: '$productivity',
              },
            },
            averageActivity: { $avg: '$activity' },
          },
        },
        {
          $project: {
            _id: 0,
            Name: '$_id.employeeName',
            Department: '$_id.department',
            daysData: 1,
            averageActivity: 1,
          },
        },
      ];

      const aggregatedData = await AttendanceCollection.rawCollection()
        .aggregate(pipeline)
        .toArray();

      const formattedData = aggregatedData.map((item) => {
        let totalOfficeTime = 0;
        let totalActivityTime = 0;
        let totalProductivity = 0;

        const formattedItem = {
          Name: item.Name,
          Department: item.Department,
          AverageActivity: `${item.averageActivity.toFixed(0)}`,
        };

        item.daysData.forEach((dayData) => {
          const dayOfWeek = dayData.dayOfWeek - 1; // Convert to array index

          const timeIn = dayData.timeIn;
          const timeOut = dayData.timeOut;
          const activity = dayData.activity;
          const productivity = dayData.productivity;

          if (timeIn && timeOut) {
            const workDuration = timeOut - timeIn;
            totalOfficeTime += workDuration;
          }

          totalActivityTime += activity;
          totalProductivity += productivity;

          formattedItem[daysOfWeek[dayOfWeek]] = `${activity.toFixed(0)}%`;
        });

        const totalDays = item.daysData.length;
        formattedItem.avgOfficeTime = (totalOfficeTime / totalDays).toFixed(0);
        formattedItem.avgActivityTime = (totalActivityTime / totalDays).toFixed(0);
        formattedItem.avgProductivity = (totalProductivity / totalDays).toFixed(0);

        return formattedItem;
      });

      return formattedData;
    },
  });
}
