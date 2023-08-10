import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetReplies } from '../../../common';

class Replies extends Watcher {
  #replies = null;
  #dbreplies = null;
  constructor(parent) {
    super(parent);
    RedisVent.Replies.prepareCollection('replies');
    this.#dbreplies = RedisVent.Replies.getCollection('replies');
  }

  get Data() {
    return this.#dbreplies.find({}).fetch();
  }

  get Replies() {
    return this.#replies;
  }

  getReplies(data) {
    this.Parent.callFunc(GetReplies, data).then((datas) => {
      this.#dbreplies.remove({});
      datas.forEach((item) => {
        this.#dbreplies.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Replies(Client);
