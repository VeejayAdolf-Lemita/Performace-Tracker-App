import { AttendanceCollection } from '../../db';
import { GetTimeline } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetTimeline]: async function ({ gte, lte }) {
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
              image: '$image',
            },
            daysData: {
              $push: {
                dayOfWeek: { $dayOfWeek: '$date' },
                timeIn: '$timeIn',
                timeOut: '$timeOut',
              },
            },
            productivity: { $avg: '$productivity' },
            activity: { $avg: '$activity' },
          },
        },
        {
          $project: {
            _id: 0,
            employeeName: '$_id.employeeName',
            department: '$_id.department',
            daysData: 1,
            productivity: 1,
            image: '$_id.image',
            activity: 1,
          },
        },
      ];

      const aggregatedData = await AttendanceCollection.rawCollection()
        .aggregate(pipeline)
        .toArray();

      const formattedData = aggregatedData.map((item) => {
        const formattedItem = {
          Name: item.employeeName,
          Department: item.department,
          image: item.image,
          activity: item.activity,
          productivity: item.productivity,
        };

        const totalPerDay = new Array(7).fill(0);

        item.daysData.forEach((dayData) => {
          const dayOfWeek = dayData.dayOfWeek;
          const timeIn = dayData.timeIn;
          const timeOut = dayData.timeOut;

          if (timeIn && timeOut) {
            const workDuration = timeOut - timeIn;
            totalPerDay[dayOfWeek] += workDuration;
          }
        });

        daysOfWeek.forEach((day, index) => {
          formattedItem[day] = totalPerDay[index] > 0 ? totalPerDay[index] : '-';
        });

        const totalWeek = totalPerDay.reduce((total, dayTotal) => total + dayTotal, 0);
        formattedItem['Total'] = totalWeek > 0 ? totalWeek : '-';

        return formattedItem;
      });

      return formattedData;
    },
  });
}
