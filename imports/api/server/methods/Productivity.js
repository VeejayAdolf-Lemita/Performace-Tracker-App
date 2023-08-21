import { ProductivityCollection } from '../../db';
import { GetProductivity } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetProductivity]: function (data) {
      if (data === 'Today') {
        const today = new Date();
        const formattedMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        const formattedDay = today.getDate().toString().padStart(2, '0');
        const formattedToday = `${formattedMonth}/${formattedDay}/${today.getFullYear()}`;

        const pipeline = [
          {
            $match: {
              filter: formattedToday,
            },
          },
          {
            $group: {
              _id: '$name',
              value: { $avg: '$value' },
            },
          },
          {
            $project: {
              value: '$value',
              name: '$_id',
              _id: 0,
            },
          },
        ];
        const membersRating = ProductivityCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(membersRating);
        return membersRating;
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
              filter: {
                $gte: formattedStartOfWeek,
                $lte: formattedToday,
              },
            },
          },
          {
            $group: {
              _id: '$name',
              value: { $avg: '$value' },
            },
          },
          {
            $project: {
              name: '$_id',
              value: '$value',
              _id: 0,
            },
          },
        ];
        const membersRating = ProductivityCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(membersRating);
        return membersRating;
      } else if (data === 'Monthly') {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const formattedStartOfMonth = `${(startOfMonth.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${startOfMonth
          .getDate()
          .toString()
          .padStart(2, '0')}/${startOfMonth.getFullYear()}`;

        const formattedToday = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today
          .getDate()
          .toString()
          .padStart(2, '0')}/${today.getFullYear()}`;

        const pipeline = [
          {
            $match: {
              filter: {
                $gte: formattedStartOfMonth,
                $lte: formattedToday,
              },
            },
          },
          {
            $group: {
              _id: '$name',
              value: { $avg: '$value' },
            },
          },
          {
            $project: {
              name: '$_id',
              value: '$value',
              _id: 0,
            },
          },
        ];
        const membersRating = ProductivityCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(membersRating);
        return membersRating;
      }
    },
  });
}
