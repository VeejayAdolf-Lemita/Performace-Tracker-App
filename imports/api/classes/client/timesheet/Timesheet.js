import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetTimesheet } from '../../../common';

class Timesheet extends Watcher {
  #timesheet = null;
  #dbtimesheet = null;
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

  getTimesheet(datas) {
    this.Parent.callFunc(GetTimesheet, datas).then((data) => {
      this.#dbtimesheet.remove({});
      data.forEach((item) => {
        // Add a unique _id field to each item before inserting
        item._id = new Meteor.Collection.ObjectID().toHexString();
        this.#dbtimesheet.insert(item);
      });
    });
  }
}

export default new Timesheet(Client);
