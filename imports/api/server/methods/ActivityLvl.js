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
          },
        },
      ];

      try {
        const activityData = await AttendanceCollection.rawCollection()
          .aggregate(pipeline)
          .toArray();

        const formattedData = activityData.map((data) => {
          const activityByDay = {
            Sun: '-',
            Mon: '-',
            Tue: '-',
            Wed: '-',
            Thu: '-',
            Fri: '-',
            Sat: '-',
          };

          data.activities.forEach((activity) => {
            const dayOfWeek = new Date(activity.date).toLocaleDateString('en-US', {
              weekday: 'short',
            });
            activityByDay[dayOfWeek] = `${activity.activity}%`;
          });

          const averageActivity = calculateAverageActivity(data.activities);

          return {
            Name: data.Name,
            Department: data.Department,
            ...activityByDay,
            Average: `${averageActivity}%`,
          };
        });

        return formattedData;
      } catch (error) {
        // Handle error
        console.error('Error fetching activity data:', error);
        throw new Meteor.Error('activity-data-fetch-error', 'Error fetching activity data');
      }
    },
  });
}

function calculateAverageActivity(activities) {
  const totalActivity = activities.reduce((total, activity) => total + activity.activity, 0);
  const averageActivity = totalActivity / activities.length;
  return averageActivity.toFixed(0); // Rounding to whole number
}
