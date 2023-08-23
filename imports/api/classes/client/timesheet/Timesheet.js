import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetTimesheet, GetFilteredTimesheet } from '../../../common';

class Timesheet extends Watcher {
  #timesheet = null;
  #dbtimesheet = null;
  #lastbasis = null;
  constructor(parent) {
    super(parent);
    RedisVent.Timesheet.prepareCollection('timesheet');
    this.#dbtimesheet = RedisVent.Timesheet.getCollection('timesheet');
  }

  get Data() {
    return this.#dbtimesheet.find({}).fetch();
  }

  get Timesheet() {
    return this.#timesheet;
  }

  getTimesheet() {
    this.Parent.callFunc(GetTimesheet, this.#lastbasis).then((data) => {
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID().toHexString();
          this.#dbtimesheet.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
    });
  }

  getFilteredTimesheet(datas) {
    this.Parent.callFunc(GetFilteredTimesheet, datas).then((data) => {
      this.#dbtimesheet.remove({});
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID(data.data._id);
          this.#dbtimesheet.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }
}

export default new Timesheet(Client);
