import { AttendanceCollection } from '../../db';
import { GetActiveMember, GetActiveMemberYesterday, GetActiveMemberWeekly } from '../../common';
import moment from 'moment';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActiveMember]: function () {
      const currentDateTime = moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const endOfDay = moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const pipeline = [
        {
          $match: {
            status: 'Present',
            date: { $gte: new Date(currentDateTime), $lte: new Date(endOfDay) },
          },
        },
        {
          $project: {
            _id: 1,
            employeeName: 1,
            activeTime: { $subtract: ['$timeOut', '$timeIn'] },
          },
        },
      ];

      const activeMembers = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
      return activeMembers;
    },
    [GetActiveMemberYesterday]: function () {
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
            status: 'Present',
            date: { $gte: new Date(yesterdayStart), $lte: new Date(yesterdayEnd) },
          },
        },
        {
          $project: {
            _id: 0,
            employeeName: 1,
            activeTime: { $subtract: ['$timeOut', '$timeIn'] },
          },
        },
      ];

      const activeMembers = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();

      return activeMembers;
    },
    [GetActiveMemberWeekly]: function () {
      const currentWeekStart = moment().startOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const currentWeekEnd = moment().endOf('week').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const pipeline = [
        {
          $match: {
            status: 'Present',
            date: { $gte: new Date(currentWeekStart), $lte: new Date(currentWeekEnd) },
          },
        },
        {
          $group: {
            _id: '$employeeName',
            totalActiveTime: { $push: { $subtract: ['$timeOut', '$timeIn'] } },
          },
        },
        {
          $project: {
            employeeName: '$_id',
            totalActiveTime: '$totalActiveTime',
            activeTime: 1,
            _id: 0,
          },
        },
      ];

      const activeMembers = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();

      return activeMembers;
    },
  });
}
