import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetGoals } from '../../../common';

class Goals extends Watcher {
  #goals = null;
  #dbgoals = null;
  constructor(parent) {
    super(parent);
    RedisVent.Goals.prepareCollection('goals');
    this.#dbgoals = RedisVent.Goals.getCollection('goals');
  }

  get Data() {
    return this.#dbgoals.find({}).fetch();
  }

  get Goals() {
    return this.#goals;
  }

  getGoals() {
    this.Parent.callFunc(GetGoals).then((data) => {
      this.#dbgoals.remove({});
      data.forEach((item) => {
        this.#dbgoals.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Goals(Client);
