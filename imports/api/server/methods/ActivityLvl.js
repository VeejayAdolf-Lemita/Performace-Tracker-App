import { AttendanceCollection } from '../../db';
import { GetActivityLevel } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActivityLevel]: function () {
      const pipeline = [
        {
          $group: {
            _id: {
              employeeName: '$employeeName',
              department: '$department',
            },
            data: {
              $push: {
                day: {
                  $dayOfWeek: { $dateFromString: { dateString: '$date', format: '%m/%d/%Y' } },
                },
                activity: '$activity',
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            data: 1,
            average: {
              $avg: '$data.activity',
            },
          },
        },
        {
          $group: {
            _id: '$_id.department',
            employees: {
              $push: {
                name: '$_id.employeeName',
                average: '$average',
                data: '$data',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            department: '$_id',
            employees: 1,
          },
        },
      ];

      const collection = AttendanceCollection.rawCollection();
      const cursor = collection.aggregate(pipeline, { allowDiskUse: true });
      const resultArray = cursor.toArray();

      const formattedResult = [];

      for (const deptData of resultArray) {
        const formattedRow = [deptData.department];
        const avgRow = ['Average'];

        for (let i = 1; i <= 5; i++) {
          const dayData = deptData.employees[0].data.find((day) => day.day === i);
          const activity = dayData ? `${Math.round(dayData.activity)}%` : '-';
          formattedRow.push(activity);

          const avgActivity =
            deptData.employees.reduce((total, emp) => {
              const empDayData = emp.data.find((day) => day.day === i);
              return total + (empDayData ? empDayData.activity : 0);
            }, 0) / deptData.employees.length;
          avgRow.push(`${Math.round(avgActivity)}%`);
        }

        formattedResult.push(formattedRow, avgRow);
      }

      return formattedResult;
    },
  });
}
