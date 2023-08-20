import { AttendanceCollection } from '../../db';
import { GetActiveMember, GetActiveMemberYesterday, GetActiveMemberWeekly } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetActiveMember]: function () {
      const today = new Date();
      const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
      const formattedDay = today.getDate().toString().padStart(2, '0');
      const formattedToday = `${formattedMonth}/${formattedDay}/${today.getFullYear()}`;

      const pipeline = [
        {
          $match: {
            status: 'Present',
            date: formattedToday,
          },
        },
        {
          $project: {
            _id: 1,
            employeeName: 1,
            activeTime: 1,
          },
        },
      ];

      const activeMembers = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();
      return activeMembers;
    },
    [GetActiveMemberYesterday]: function () {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const formattedMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
      const formattedDay = yesterday.getDate().toString().padStart(2, '0');
      const formattedYesterday = `${formattedMonth}/${formattedDay}/${yesterday.getFullYear()}`;
      console.log(formattedYesterday);
      const pipeline = [
        {
          $match: {
            status: 'Present',
            date: formattedYesterday,
          },
        },
        {
          $project: {
            _id: 0,
            employeeName: 1,
            activeTime: 1,
          },
        },
      ];

      const activeMembers = AttendanceCollection.rawCollection().aggregate(pipeline).toArray();

      return activeMembers;
    },
    [GetActiveMemberWeekly]: function () {
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

      console.log(formattedStartOfWeek);
      const pipeline = [
        {
          $match: {
            status: 'Present',
            date: {
              $gte: formattedStartOfWeek,
              $lte: formattedToday,
            },
          },
        },
        {
          $group: {
            _id: '$employeeName',
            totalActiveTime: { $push: '$activeTime' },
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
