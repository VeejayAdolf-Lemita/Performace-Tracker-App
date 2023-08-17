import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetFeedback } from '../../../common';

class Feedback extends Watcher {
  #feedback = null;
  #dbfeedback = null;
  constructor(parent) {
    super(parent);
    RedisVent.Feedback.prepareCollection('goals');
    this.#dbfeedback = RedisVent.Feedback.getCollection('goals');
  }

  get Data() {
    return this.#dbfeedback.find({}).fetch();
  }

  get Feedback() {
    return this.#feedback;
  }

  getFeedback(datas) {
    this.Parent.callFunc(GetFeedback, datas)
      .then((data) => {
        this.#dbfeedback.remove({});
        data.forEach((item) => {
          this.#dbfeedback.insert(item);
        });
        this.activateWatcher();
      })
      .catch((error) => {
        if (error.error === 'no-results') {
          alert(error.reason);
        } else {
          // Handle other errors if needed
          console.error('An error occurred:', error);
        }
      });
  }
}

export default new Feedback(Client);
