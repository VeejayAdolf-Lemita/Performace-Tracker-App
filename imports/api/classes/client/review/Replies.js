import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetReplies, AddReply } from '../../../common';

class Replies extends Watcher {
  #replies = null;
  #dbreplies = null;
  #listen = null;
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

  addReply(data) {
    this.Parent.callFunc(AddReply, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Replies.listen('replies', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
  }

  getReplies(data) {
    this.Parent.callFunc(GetReplies, data).then((datas) => {
      this.#dbreplies.remove({});
      datas.forEach((item) => {
        console.log(item);
        this.#dbreplies.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Replies(Client);
