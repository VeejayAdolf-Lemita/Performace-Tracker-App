import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetGoalsWIndex, GetGoals, AddGoal } from '../../../common';

class Goals extends Watcher {
  #goals = null;
  #dbgoals = null;
  #goalswindex = null;
  #dbgoalswindex = null;
  #listen = null;
  #lastbasis = null;
  constructor(parent) {
    super(parent);
    RedisVent.Goals.prepareCollection('goals');
    this.#dbgoals = RedisVent.Goals.getCollection('goals');
    RedisVent.GoalsWIndex.prepareCollection('goalswindex');
    this.#dbgoalswindex = RedisVent.GoalsWIndex.getCollection('goalswindex');
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
    try {
      if (!this.#listen) {
        this.#listen = RedisVent.GoalsWIndex.listen('goalswindex', '123', ({ event, data }) => {
          console.log(event, data);
          switch (event) {
            case 'insert':
          }
        });
        this.activateWatcher();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getGoals(datas) {
    this.Parent.callFunc(GetGoals, datas).then((data) => {
      this.#dbgoals.remove({});
      data.forEach((item) => {
        this.#dbgoals.insert(item);
      });
      this.activateWatcher();
    });
  }

  get GoalsData() {
    return this.GoalsWIndex.find({}, { sort: { timestamp: -1 } }).fetch();
  }
  /**
   *
   * @returns {import ("meteor/mongo").Mongo.Collection}
   */
  get GoalsWIndex() {
    return this.#dbgoalswindex;
  }

  getGoalsWIndex(datas) {
    let lastbasis = this.#lastbasis;
    this.Parent.callFunc(GetGoalsWIndex, { datas, lastbasis }).then((data) => {
      console.log(data);
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          this.#dbgoalswindex.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  clearDB() {
    this.#dbgoalswindex.remove({});
    this.#lastbasis = null;
  }
}

export default new Goals(Client);
