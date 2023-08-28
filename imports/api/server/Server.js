import RedisVent from '../server/RedisVent';
import { Meteor } from 'meteor/meteor';

class Server {
  #settings = null;
  constructor(settings) {
    this.#settings = settings;
  }

  get Config() {
    return this.#settings;
  }

  startRedis() {
    return new Promise((resolve) => {
      const red = RedisVent.publish();
      console.log('Redis ready!', red);
      resolve();
    });
  }

  async run() {
    return Promise.all([this.startRedis()]).then(() => {
      console.log('Server is ready..');
    });
  }
}

export default new Server(Meteor.settings);
