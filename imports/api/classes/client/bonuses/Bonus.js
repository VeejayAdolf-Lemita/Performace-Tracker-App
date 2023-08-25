import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetBonuses, AddBonus } from '../../../common';

class Bonus extends Watcher {
  #bonus = null;
  #dbbonuses = null;
  #listen = null;
  #lastbasis = null;
  constructor(parent) {
    super(parent);
    RedisVent.Bonuses.prepareCollection('bonuses');
    this.#dbbonuses = RedisVent.Bonuses.getCollection('bonuses');
  }

  get Data() {
    return this.Bonuses.find({}, { sort: { timestamp: -1 } }).fetch();
  }

  get Bonuses() {
    return this.#dbbonuses;
  }

  addBonus(data) {
    this.Parent.callFunc(AddBonus, data).catch((error) => console.log(error));
  }

  listen() {
    try {
      if (!this.#listen) {
        this.#listen = RedisVent.Bonuses.listen('bonuses', '123', ({ event, data }) => {
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

  getBonuses(datas) {
    let lastbasis = this.#lastbasis;
    this.Parent.callFunc(GetBonuses, { datas, lastbasis }).then((data) => {
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID(data.data._id);
          this.#dbbonuses.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  clearDB() {
    this.#dbbonuses.remove({});
    this.#lastbasis = null;
  }
}

export default new Bonus(Client);
