import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import {
  GetReviews,
  GetReviewsSubject,
  AddReview,
  GetUserReview,
  GetUserRecieve,
  GetTopMostAppreciated,
} from '../../../common';

class Reviews extends Watcher {
  #reviews = null;
  #dbreviews = null;
  #lastbasis = null;
  #usergiven = null;
  #userrecieve = null;
  #mostappreciated = null;
  #listen = null;
  constructor(parent) {
    super(parent);
    RedisVent.Reviews.prepareCollection('reviews');
    this.#dbreviews = RedisVent.Reviews.getCollection('reviews');
  }

  get Data() {
    return this.Reviews.find({}, { sort: { timestamp: -1 } }).fetch();
  }
  /**
   *
   * @returns {import ("meteor/mongo").Mongo.Collection}
   */
  get Reviews() {
    return this.#dbreviews;
  }

  addReview(data) {
    this.Parent.callFunc(AddReview, data).catch((error) => console.log(error));
  }

  listen() {
    try {
      if (!this.#listen) {
        this.#listen = RedisVent.Reviews.listen('reviews', '123', ({ event, data }) => {
          console.log(event, data);
          switch (event) {
            case 'insert':
          }
        });
      }
      this.activateWatcher();
    } catch (error) {
      console.log(error);
    }
  }

  get UserReviews() {
    return this.#usergiven;
  }

  getUserReview(datas) {
    this.Parent.callFunc(GetUserReview, datas).then((data) => {
      this.#usergiven = data.count;
      return this.#usergiven;
    });
  }

  get UserRecieve() {
    return this.#userrecieve;
  }

  getUserRecieve(datas) {
    this.Parent.callFunc(GetUserRecieve, datas).then((data) => {
      this.#userrecieve = data.count;
      return this.#userrecieve;
    });
  }

  get MostAppreciated() {
    return this.#mostappreciated;
  }

  getMostAppreciated() {
    this.Parent.callFunc(GetTopMostAppreciated).then((data) => {
      this.#mostappreciated = data;
      return this.#userrecieve;
    });
  }

  getReviewEntireCompany(datas) {
    let lastbasis = this.#lastbasis;
    this.Parent.callFunc(GetReviews, { datas, lastbasis }).then((data) => {
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          this.#dbreviews.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  clearDB() {
    this.#dbreviews.remove({});
    this.#lastbasis = null;
  }
}

export default new Reviews(Client);
