import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetActivityLevel } from '../../../common';

class ActivityLevel extends Watcher {
  #activitylevel = null;
  #dbactivitylevel = null;
  constructor(parent) {
    super(parent);
    RedisVent.ActivityLvl.prepareCollection('activityLvl');
    this.#dbactivitylevel = RedisVent.ActivityLvl.getCollection('activityLvl');
  }

  get Data() {
    return this.#dbactivitylevel.find({}).fetch();
  }

  get ActivityLvl() {
    return this.#activitylevel;
  }

  getActivityLvl(gte, lte) {
    this.Parent.callFunc(GetActivityLevel, gte, lte).then((data) => {
      this.#dbactivitylevel.remove({});
      data.forEach((item) => {
        // Add a unique _id field to each item before inserting
        item._id = new Meteor.Collection.ObjectID().toHexString();
        this.#dbactivitylevel.insert(item);
      });
    });
  }
}

export default new ActivityLevel(Client);
