import { EmployeesCollection } from '../../db';
import { GetEmployees, AddMember } from '../../common';
import RedisVent from '../RedisVent';
import moment from 'moment';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.methods({
    [GetEmployees]: function ({ datas, lastbasis }) {
      const pipeline = [];
      const match = { index1: { $regex: datas } };
      const project = {
        _id: 1,
        name: 1,
        salary: 1,
        position: 1,
        employmentStatus: 1,
        timestamp: 1,
        department: 1,
        productivity: 1,
        image: 1,
        index1: 1,
      };
      if (lastbasis) match.index1.$lt = lastbasis;
      pipeline.push({ $match: match });
      pipeline.push({ $project: project });
      pipeline.push({ $limit: 4 });
      return EmployeesCollection.rawCollection()
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
    [AddMember]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        data.index1 = `${data.department}${data.timestamp}`;
        const id = EmployeesCollection.insert(data);
        data._id = id._str;
        console.info(
          'Member.js call[%s]: %s at %s',
          AddMember,
          `New Employees Added!`,
          moment(data.timestamp),
        );
        RedisVent.Employees.triggerInsert('employees', '123', data);
      } catch (error) {
        console.error(AddMember, error);
      }
    },
  });
}
