import { AttendanceCollection, EmployeesCollection } from '../../db';
import { GetAttendance, GetActive, GetFilteredAttendance } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetAttendance]: function (lastbasis) {
      const pipeline = [];
      const match = { index1: { $regex: 'Company' } };
      const project = {
        _id: 1,
        index1: 1,
        employeeName: 1,
        date: 1,
        status: 1,
        timeIn: 1,
        timeOut: 1,
        activity: 1,
        productivity: 1,
      };
      const addFields = {
        duration: { $subtract: ['$timeOut', '$timeIn'] },
      };
      if (lastbasis) match.index1.$lt = lastbasis;
      pipeline.push({ $match: match });
      pipeline.push({ $project: project });
      pipeline.push({ $addFields: addFields });
      pipeline.push({ $limit: 10 });
      return AttendanceCollection.rawCollection()
        .aggregate(pipeline, { allowDiskUse: true })
        .toArray()
        .then((res) => {
          const retval = {};
          if (res && res.length) {
            retval.data = res.map((d) => ({ ...d, _id: d._id }));
            retval.lastbasis = res[res.length - 1].index1;
          }
          return retval;
        });
    },
    [GetFilteredAttendance]: function (data, lastbasis) {
      console.log(data);
      const pipeline = [];
      const match = { index1: { $regex: 'Company' }, date: new Date(data) };
      const project = {
        _id: 1,
        index1: 1,
        employeeName: 1,
        date: 1,
        status: 1,
        timeIn: 1,
        timeOut: 1,
        activity: 1,
        productivity: 1,
      };
      const addFields = {
        duration: { $subtract: ['$timeOut', '$timeIn'] },
      };
      if (lastbasis) match.index1.$lt = lastbasis;
      pipeline.push({ $match: match });
      pipeline.push({ $project: project });
      pipeline.push({ $addFields: addFields });
      return AttendanceCollection.rawCollection()
        .aggregate(pipeline, { allowDiskUse: true })
        .toArray()
        .then((res) => {
          const retval = {};
          if (res && res.length) {
            retval.data = res.map((d) => ({ ...d, _id: d._id }));
            retval.lastbasis = res[res.length - 1].index1;
          }
          return retval;
        });
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
