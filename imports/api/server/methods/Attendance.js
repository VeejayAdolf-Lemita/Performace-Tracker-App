import { AttendanceCollection } from '../../db';
import { GetAttendance } from '../../common';

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
  });
}
