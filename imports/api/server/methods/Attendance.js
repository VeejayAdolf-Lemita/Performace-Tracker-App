import { AttendanceCollection, EmployeesCollection } from '../../db';
import { GetAttendance, GetActive, GetFilteredAttendance } from '../../common';
import moment from 'moment';

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
    [GetFilteredAttendance]: function ({ datas, lastbasis }) {
      const pipeline = [];
      const match = { index1: { $regex: 'Company' }, date: new Date(datas) };
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
        const currentDateTime = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const endOfDay = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const pipeline = [
          {
            $match: {
              date: { $gte: new Date(currentDateTime), $lte: new Date(endOfDay) },
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
              timeInHours: { $divide: ['$timeIn', 3600] },
              timeOutHours: { $divide: ['$timeOut', 3600] },
              earlyLeaving: { $cond: [{ $lt: ['$timeOutHours', 6] }, 1, 0] },
              lateArrival: { $cond: [{ $gt: ['$timeInHours', 20] }, 1, 0] },
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
        const currentWeekStart = moment().startOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const currentWeekEnd = moment().endOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const pipeline = [
          {
            $match: {
              date: { $gte: new Date(currentWeekStart), $lte: new Date(currentWeekEnd) },
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
              timeInHours: { $divide: ['$timeIn', 3600] },
              timeOutHours: { $divide: ['$timeOut', 3600] },
              earlyLeaving: { $cond: [{ $lt: ['$timeOutHours', 6] }, 1, 0] },
              lateArrival: { $cond: [{ $gt: ['$timeInHours', 20] }, 1, 0] },
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
        const yesterdayStart = moment()
          .subtract(1, 'day')
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const yesterdayEnd = moment()
          .subtract(1, 'day')
          .endOf('day')
          .format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        const pipeline = [
          {
            $match: {
              date: { $gte: new Date(yesterdayStart), $lte: new Date(yesterdayEnd) },
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
              timeInHours: { $divide: ['$timeIn', 3600] },
              timeOutHours: { $divide: ['$timeOut', 3600] },
              earlyLeaving: { $cond: [{ $lt: ['$timeOutHours', 6] }, 1, 0] },
              lateArrival: { $cond: [{ $gt: ['$timeInHours', 20] }, 1, 0] },
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
