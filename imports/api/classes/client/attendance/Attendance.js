import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetAttendance, GetFilteredAttendance } from '../../../common';

class Attendace extends Watcher {
  #attendance = null;
  #dbattendance = null;
  #lastbasis = null;
  constructor(parent) {
    super(parent);
    RedisVent.Attendance.prepareCollection('attendance');
    this.#dbattendance = RedisVent.Attendance.getCollection('attendance');
  }

  get Data() {
    return this.#dbattendance.find({}).fetch();
  }

  get Attendance() {
    return this.#attendance;
  }

  getAttendance() {
    this.Parent.callFunc(GetAttendance, this.#lastbasis).then((data) => {
      console.log(data);
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID(data.data._id);
          this.#dbattendance.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  getFilteredAttendance(datas) {
    console.log(datas);
    let lastbasis = this.#lastbasis;
    this.Parent.callFunc(GetFilteredAttendance, { datas, lastbasis }).then((data) => {
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID(data.data._id);
          this.#dbattendance.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  clearDB() {
    this.#dbattendance.remove({});
    this.#lastbasis = null;
  }
}

export default new Attendace(Client);
