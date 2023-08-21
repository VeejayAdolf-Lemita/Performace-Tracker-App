import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetActive } from '../../../common';

class Attendance extends Watcher {
  #activeattendance = null;
  #dbactiveattendance = null;
  constructor(parent) {
    super(parent);
    RedisVent.ActiveAttendance.prepareCollection('activeattendance');
    this.#dbactiveattendance = RedisVent.ActiveAttendance.getCollection('activeattendance');
  }

  get Data() {
    return this.#dbactiveattendance
      .find({})
      .fetch()
      .map((data) => data);
  }

  get ActiveAttendance() {
    return this.#activeattendance;
  }

  getActiveAttendance(datas) {
    this.Parent.callFunc(GetActive, datas).then((data) => {
      this.#dbactiveattendance.remove({});
      data.forEach((item) => {
        this.#dbactiveattendance.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Attendance(Client);
