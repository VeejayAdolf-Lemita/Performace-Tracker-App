import { RatingCollection } from '../../db';
import { GetRating } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetRating]: function (data) {
      if (data === 'Total') {
        const pipeline = [
          {
            $group: {
              _id: '$name',
              rating: { $avg: '$rating' },
            },
          },
          {
            $project: {
              name: '$_id',
              rating: '$rating',
              _id: 0,
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          {
            $limit: 5,
          },
        ];

        const membersRating = RatingCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(membersRating);
        return membersRating;
      } else if (data === 'Today') {
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
              rating: { $avg: '$rating' },
            },
          },
          {
            $project: {
              name: '$_id',
              rating: '$rating',
              _id: 0,
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          {
            $limit: 5,
          },
        ];

        const membersRating = RatingCollection.rawCollection().aggregate(pipeline).toArray();
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
            $project: {
              name: 1,
              rating: 1,
              _id: 0,
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },

          {
            $limit: 5,
          },
        ];

        const membersRating = RatingCollection.rawCollection().aggregate(pipeline).toArray();
        console.log(membersRating);
        return membersRating;
      }
    },
  });
}
