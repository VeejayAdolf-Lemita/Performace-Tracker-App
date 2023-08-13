import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetBonuses, AddBonus } from '../../../common';

class Bonus extends Watcher {
  #bonus = null;
  #dbbonuses = null;
  #listen = null;
  constructor(parent) {
    super(parent);
    RedisVent.Bonuses.prepareCollection('bonuses');
    this.#dbbonuses = RedisVent.Bonuses.getCollection('bonuses');
  }

  get Data() {
    return this.#dbbonuses.find({}).fetch();
  }

  get Bonuses() {
    return this.#bonus;
  }

  addBonus(data) {
    this.Parent.callFunc(AddBonus, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Bonuses.listen('bonuses', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
  }

  getBonuses(datas) {
    this.Parent.callFunc(GetBonuses, datas).then((data) => {
      this.#dbbonuses.remove({});
      data.forEach((item) => {
        this.#dbbonuses.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Bonus(Client);
