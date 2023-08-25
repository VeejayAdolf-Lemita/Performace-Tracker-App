import Watcher from './Watcher';
import { Accounts } from 'meteor/accounts-base';

class Client extends Watcher {
  constructor(parent) {
    super(parent);
    this.secureTransaction();
  }
  init() {
    return this.subscribe('users');
  }

  changePassword(oldPassword, newPassword) {
    Accounts.changePassword(oldPassword, newPassword, function (error) {
      if (error) {
        // Password change failed, handle the error
        console.error('Password change failed:', error.message);
        alert('Incorrect Old Password');
      } else {
        // Password change succeeded
        alert('Password changed successfully');
      }
    });
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
