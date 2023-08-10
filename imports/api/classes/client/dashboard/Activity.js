import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetActivity } from '../../../common';

class Activity extends Watcher {
  #activity = null;
  #dbactivity = null;
  constructor(parent) {
    super(parent);
    RedisVent.Activity.prepareCollection('activity');
    this.#dbactivity = RedisVent.Activity.getCollection('activity');
  }

  get Data() {
    return this.#dbactivity
      .find({})
      .fetch()
      .map((data) => data);
  }

  get Activity() {
    return this.#activity;
  }

  getActivity() {
    this.Parent.callFunc(GetActivity, '123').then((data) => {
      data.forEach((item) => {
        this.#dbactivity.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Activity(Client);
