import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetEmployees, AddMember } from '../../../common';

class Employees extends Watcher {
  #employees = null;
  #dbemployees = null;
  #listen = null;
  #lastbasis = null;
  constructor(parent) {
    super(parent);
    RedisVent.Employees.prepareCollection('employees');
    this.#dbemployees = RedisVent.Employees.getCollection('employees');
  }

  get Data() {
    return this.Employees.find({}, { sort: { timestamp: -1 } }).fetch();
  }

  get Employees() {
    return this.#dbemployees;
  }

  addMember(data) {
    this.Parent.callFunc(AddMember, data).catch((error) => console.log(error));
  }

  listen() {
    try {
      if (!this.#listen) {
        this.#listen = RedisVent.Employees.listen('employees', '123', ({ event, data }) => {
          console.log(event, data);
          switch (event) {
            case 'insert':
          }
        });
        this.activateWatcher();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getEmployees(datas) {
    let lastbasis = this.#lastbasis;
    this.Parent.callFunc(GetEmployees, { datas, lastbasis }).then((data) => {
      if (data && data.data && data.data.length) {
        data.data.forEach((item) => {
          item._id = new Meteor.Collection.ObjectID(data.data._id);
          this.#dbemployees.insert(item);
        });
        this.#lastbasis = data.lastbasis;
      }
      this.activateWatcher();
    });
  }

  clearDB() {
    this.#dbemployees.remove({});
    this.#lastbasis = null;
  }
}

export default new Employees(Client);
