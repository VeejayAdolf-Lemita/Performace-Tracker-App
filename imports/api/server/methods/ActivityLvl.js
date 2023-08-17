import { AttendanceCollection } from '../../db';
import { GetActivityLevel } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActivityLevel]: async function (startDate, endDate) {
      const matchStage = {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      };

      const pipeline = [
        {
          $match: matchStage,
        },
        {
          $group: {
            _id: {
              employeeName: '$employeeName',
              department: '$department',
            },
            activities: {
              $push: {
                date: '$date',
                activity: '$activity',
                productivity: '$productivity',
                activeTime: { $toDouble: { $substr: ['$activeTime', 0, 2] } },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            Name: '$_id.employeeName',
            Department: '$_id.department',
            activities: 1,
            averageActivity: { $avg: '$activities.activity' },
            averageActiveTime: { $avg: '$activities.activeTime' },
          },
        },
      ];

      try {
        const activityData = await AttendanceCollection.rawCollection()
          .aggregate(pipeline)
          .toArray();

        const formattedData = activityData.map((data) => {
          const activityByDay = {
            Mon: '-',
            Tue: '-',
            Wed: '-',
            Thu: '-',
            Fri: '-',
          };
          let totalActiveTime = 0; // Initialize the total active time

          data.activities.forEach((activity) => {
            const dayOfWeek = new Date(activity.date).toLocaleDateString('en-US', {
              weekday: 'short',
            });
            activityByDay[dayOfWeek] = `${activity.activity}%`;
            totalActiveTime += activity.activeTime; // Accumulate active time
          });

          const averageActiveTime = totalActiveTime / data.activities.length; // Calculate average active time

          const officeTimeAverage = calculateOfficeTimeAverage(data.activities, averageActiveTime);

          const totalProductivity = data.activities.reduce((total, activity) => {
            if (typeof activity.productivity === 'number' && !isNaN(activity.productivity)) {
              return total + activity.productivity;
            }
            return total;
          }, 0);

          const averageProductivity =
            data.activities.length > 0 ? totalProductivity / data.activities.length : 0;

          const roundedAverageProductivity = Math.round(averageProductivity); // Round to the nearest integer

          const formattedAverageProductivity = roundedAverageProductivity.toString();

          return {
            Name: data.Name,
            Department: data.Department,
            ...activityByDay,
            AverageActivity: `${data.averageActivity.toFixed(0)}%`,
            AverageActiveTime: `${averageActiveTime.toFixed(2)}h`,
            OfficeTimeAverage: `${officeTimeAverage.toFixed(2)}h`,
            AverageProductivity: `${formattedAverageProductivity}%`,
          };
        });

        // Function to calculate office time average
        function calculateOfficeTimeAverage(activities, averageActiveTime) {
          const totalOfficeTime = activities.reduce((total, activity) => {
            const officeTime = 24 - averageActiveTime - activity.activeTime; // Calculate office time per activity
            return total + officeTime;
          }, 0);

          return totalOfficeTime / activities.length;
        }

        return formattedData;
      } catch (error) {
        // Handle error
        console.error('Error fetching activity data:', error);
        throw new Meteor.Error('activity-data-fetch-error', 'Error fetching activity data');
      }
    },
  });
}
