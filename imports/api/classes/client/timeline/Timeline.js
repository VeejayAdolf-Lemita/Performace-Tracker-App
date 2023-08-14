import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetTimeline } from '../../../common';

class Timeline extends Watcher {
  #timeline = null;
  #dbtimeline = null;
  constructor(parent) {
    super(parent);
    RedisVent.Timeline.prepareCollection('timesheet');
    this.#dbtimeline = RedisVent.Timeline.getCollection('timesheet');
  }

  get Data() {
    return this.#dbtimeline.find({}).fetch();
  }

  get Timeline() {
    return this.#timeline;
  }

  getTimeline(gte, lte) {
    this.Parent.callFunc(GetTimeline, gte, lte).then((data) => {
      this.#dbtimeline.remove({});
      data.forEach((item) => {
        // Add a unique _id field to each item before inserting
        item._id = new Meteor.Collection.ObjectID().toHexString();
        this.#dbtimeline.insert(item);
      });
    });
  }
}

export default new Timeline(Client);
