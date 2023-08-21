import { AttendanceCollection, EmployeesCollection } from '../../db';
import { GetAttendance, GetActive } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetAttendance]: function (gte, lte) {
      if ((gte === '' && lte === '') || gte === undefined || gte === null) {
        const attendanceData = AttendanceCollection.find({}).fetch();

        const formattedData = attendanceData.map((data) => {
          const dateObj = new Date(data.date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          const startTime = new Date(`2000-01-01T${data.timeIn}`);
          const stopTime = new Date(`2000-01-02T${data.timeOut}`);
          const durationMillis = stopTime - startTime;

          const durationHours = Math.floor(durationMillis / (60 * 60 * 1000));
          const durationMinutes = Math.floor((durationMillis % (60 * 60 * 1000)) / (60 * 1000));

          return {
            Name: data.employeeName,
            Date: formattedDate,
            Status: data.status,
            StartTime: data.timeIn,
            StopTime: data.timeOut,
            Duration: `${durationHours}h ${durationMinutes}m`,
            Activity: `${data.activity}%`,
            ActiveTime: data.activeTime,
            Productivity: data.productivity,
          };
        });
        return formattedData;
      } else {
        const attendanceData = AttendanceCollection.find({
          date: { $gte: gte, $lte: lte },
        }).fetch();

        const formattedData = attendanceData.map((data) => {
          const dateObj = new Date(data.date);
          const formattedDate = dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          const startTime = new Date(`2000-01-01T${data.timeIn}`);
          const stopTime = new Date(`2000-01-02T${data.timeOut}`);
          const durationMillis = stopTime - startTime;

          const durationHours = Math.floor(durationMillis / (60 * 60 * 1000));
          const durationMinutes = Math.floor((durationMillis % (60 * 60 * 1000)) / (60 * 1000));

          return {
            Name: data.employeeName,
            Date: formattedDate,
            Status: data.status,
            StartTime: data.timeIn,
            StopTime: data.timeOut,
            Duration: `${durationHours}h ${durationMinutes}m`,
            Activity: `${data.activity}%`,
            ActiveTime: data.activeTime,
            Productivity: data.productivity,
          };
        });
        return formattedData;
      }
    },
    [GetActive]: function (data) {
      if (data === 'Today') {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedDay = today.getDate().toString().padStart(2, '0');
        const formattedToday = `${formattedMonth}/${formattedDay}/${today.getFullYear()}`;
        const pipeline = [
          {
            $match: {
              date: formattedToday,
            },
          },
          {
            $project: {
              status: 1,
              timeIn: 1,
              timeOut: 1,
            },
          },
          {
            $addFields: {
              earlyLeaving: {
                $cond: [{ $lt: ['$timeOut', '06:00:00'] }, 1, 0],
              },
              lateArrival: { $cond: [{ $gt: ['$timeIn', '20:00:00'] }, 1, 0] },
            },
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              earlyLeavingCount: { $sum: '$earlyLeaving' },
              lateArrivalCount: { $sum: '$lateArrival' },
            },
          },
          {
            $project: {
              status: '$_id',
              count: 1,
              earlyLeavingCount: 1,
              lateArrivalCount: 1,
              _id: 0,
            },
          },
        ];

        const dashboardActive = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
        return dashboardActive;
      } else if (data === 'Weekly') {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const formattedStartOfWeek = `${(startOfWeek.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${startOfWeek
          .getDate()
          .toString()
          .padStart(2, '0')}/${startOfWeek.getFullYear()}`;
        const formattedToday = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today
          .getDate()
          .toString()
          .padStart(2, '0')}/${today.getFullYear()}`;
        const pipeline = [
          {
            $match: {
              date: {
                $gte: formattedStartOfWeek,
                $lte: formattedToday,
              },
            },
          },
          {
            $project: {
              status: 1,
              timeIn: 1,
              timeOut: 1,
            },
          },
          {
            $addFields: {
              earlyLeaving: {
                $cond: [{ $lt: ['$timeOut', '06:00:00'] }, 1, 0],
              },
              lateArrival: { $cond: [{ $gt: ['$timeIn', '20:00:00'] }, 1, 0] },
            },
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              earlyLeavingCount: { $sum: '$earlyLeaving' },
              lateArrivalCount: { $sum: '$lateArrival' },
            },
          },
          {
            $project: {
              status: '$_id',
              count: 1,
              earlyLeavingCount: 1,
              lateArrivalCount: 1,
              _id: 0,
            },
          },
        ];

        const dashboardActive = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
        return dashboardActive;
      } else if (data === 'Yesterday') {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const formattedMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
        const formattedDay = yesterday.getDate().toString().padStart(2, '0');
        const formattedYesterday = `${formattedMonth}/${formattedDay}/${yesterday.getFullYear()}`;
        const pipeline = [
          {
            $match: {
              date: formattedYesterday,
            },
          },
          {
            $project: {
              status: 1,
              timeIn: 1,
              timeOut: 1,
            },
          },
          {
            $addFields: {
              earlyLeaving: {
                $cond: [{ $lt: ['$timeOut', '06:00:00'] }, 1, 0],
              },
              lateArrival: { $cond: [{ $gt: ['$timeIn', '20:00:00'] }, 1, 0] },
            },
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              earlyLeavingCount: { $sum: '$earlyLeaving' },
              lateArrivalCount: { $sum: '$lateArrival' },
            },
          },
          {
            $project: {
              status: '$_id',
              count: 1,
              earlyLeavingCount: 1,
              lateArrivalCount: 1,
              _id: 0,
            },
          },
        ];

        const dashboardActive = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
        return dashboardActive;
      }
    },
  });
}
