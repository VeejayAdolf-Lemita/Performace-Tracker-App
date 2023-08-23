import { BonusesCollection } from '../../db';
import { GetBonuses, AddBonus } from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetBonuses]: function (data) {
      let bonusesQuery = {};

      if (data && data !== '') {
        bonusesQuery.status = data;
      }

      const bonuses = BonusesCollection.find(bonusesQuery)
        .fetch()
        .map((data) => data)
        .sort((a, b) => b.timestamp - a.timestamp); // Assuming you have a 'timestamp' property in your bonus objects

      return bonuses;
    },
    [AddBonus]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = BonusesCollection.insert(data);
        data._id = id._str;
        console.info(
          'Bonus.js call[%s]: %s at %s',
          AddBonus,
          `New Bonus Added! ID: ${data._id}`,
          moment(data.timestamp),
        );
        RedisVent.Bonuses.triggerInsert('bonuses', '123', data);
      } catch (error) {
        console.error(AddBonus, error);
      }
    },
  });
}
