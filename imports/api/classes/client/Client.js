import Watcher from './Watcher';

class Client extends Watcher {
  constructor(parent) {
    super(parent);
    this.secureTransaction();
  }
  init() {
    return this.subscribe('users');
  }

  loginWithPassword(email, password) {
    return new Promise((resolve, reject) => {
      this.login(email, password, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default new Client();
