import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetAttendance } from '../../../common';

class Attendace extends Watcher {
  #attendance = null;
  #dbattendance = null;
  constructor(parent) {
    super(parent);
    RedisVent.Attendance.prepareCollection('timesheet');
    this.#dbattendance = RedisVent.Attendance.getCollection('timesheet');
  }

  get Data() {
    return this.#dbattendance.find({}).fetch();
  }

  get Attendance() {
    return this.#attendance;
  }

  getAttendance(gte, lte) {
    this.Parent.callFunc(GetAttendance, gte, lte).then((data) => {
      this.#dbattendance.remove({});
      data.forEach((item) => {
        // Add a unique _id field to each item before inserting
        item._id = new Meteor.Collection.ObjectID().toHexString();
        this.#dbattendance.insert(item);
      });
    });
  }
}

export default new Attendace(Client);
