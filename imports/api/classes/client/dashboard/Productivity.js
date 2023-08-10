import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetProductivity } from '../../../common';

class Productivity extends Watcher {
  #productivity = null;
  #dbproductivity = null;
  constructor(parent) {
    super(parent);
    RedisVent.Productivity.prepareCollection('productivity');
    this.#dbproductivity = RedisVent.Productivity.getCollection('productivity');
  }

  get Data() {
    return this.#dbproductivity.find({}).fetch();
  }

  get Productivity() {
    return this.#productivity;
  }

  getProductivity(filter) {
    this.Parent.callFunc(GetProductivity, filter).then((data) => {
      this.#dbproductivity.remove({});
      data.forEach((item) => {
        this.#dbproductivity.insert(item);
      });
    });
  }
}

export default new Productivity(Client);
