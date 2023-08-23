import { AttendanceCollection } from '../../db';
import { GetTimesheet } from '../../common';

if (Meteor.isServer) {
  Meteor.methods({
    [GetTimesheet]: function (lastbasis) {
      const pipeline = [];
      const match = { index1: { $regex: 'Company' } };
      const project = {
        _id: 1,
        index1: 1,
        employeeName: 1,
        date: 1,
        timeIn: 1,
        timeOut: 1,
        salary: 1,
        productivity: 1,
        department: 1,
        image: 1,
      };
      const addFields = {
        officeTime: { $subtract: ['$timeOut', '$timeIn'] },
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
  });
}
