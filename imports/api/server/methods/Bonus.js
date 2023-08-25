import { BonusesCollection } from '../../db';
import { GetBonuses, AddBonus } from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetBonuses]: function ({ datas, lastbasis }) {
      const pipeline = [];
      const match = { index1: { $regex: datas } };
      const project = {
        _id: 1,
        employeeName: 1,
        earned: 1,
        message: 1,
        index1: 1,
        status: 1,
        timestamp: 1,
        createdAt: 1,
        dateReleased: 1,
      };
      if (lastbasis) match.index1.$lt = lastbasis;
      pipeline.push({ $match: match });
      pipeline.push({ $project: project });
      pipeline.push({ $limit: 4 });
      return BonusesCollection.rawCollection()
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
    [AddBonus]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        data.index1 = `${data.status}${data.timestamp}`;
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
