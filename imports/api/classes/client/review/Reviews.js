import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import {
  GetReviews,
  AddReview,
  GetUserReview,
  GetUserRecieve,
  GetTopMostAppreciated,
} from '../../../common';

class Reviews extends Watcher {
  #reviews = null;
  #dbreviews = null;
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
    return this.#dbreviews.find({}).fetch();
  }

  get Reviews() {
    return this.#reviews;
  }

  addReview(data) {
    this.Parent.callFunc(AddReview, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Reviews.listen('reviews', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
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

  getReviews(data) {
    this.Parent.callFunc(GetReviews, data).then((datas) => {
      this.#dbreviews.remove({});
      if (data) {
        datas.forEach((item) => {
          this.#dbreviews.insert(item);
        });
        this.activateWatcher();
      }
    });
  }
}

export default new Reviews(Client);
