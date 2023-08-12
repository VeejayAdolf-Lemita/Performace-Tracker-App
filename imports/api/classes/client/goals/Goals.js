import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetGoals, AddGoal } from '../../../common';

class Goals extends Watcher {
  #goals = null;
  #dbgoals = null;
  #listen = null;
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

  addGoal(data) {
    this.Parent.callFunc(AddGoal, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Goals.listen('goals', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
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
