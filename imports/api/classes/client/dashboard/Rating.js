import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetRating } from '../../../common';

class Rating extends Watcher {
  #rating = null;
  #dbrating = null;
  constructor(parent) {
    super(parent);
    RedisVent.Ratings.prepareCollection('productivity');
    this.#dbrating = RedisVent.Ratings.getCollection('productivity');
  }

  get Data() {
    return this.#dbrating.find({}).fetch();
  }

  get Ratings() {
    return this.#rating;
  }

  getRatings(filter) {
    this.Parent.callFunc(GetRating, filter).then((data) => {
      this.#dbrating.remove({});
      data.forEach((item) => {
        this.#dbrating.insert(item);
      });
    });
  }
}

export default new Rating(Client);
