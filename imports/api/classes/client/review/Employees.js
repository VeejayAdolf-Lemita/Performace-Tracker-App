import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetEmployees } from '../../../common';

class Employees extends Watcher {
  #employees = null;
  #dbemployees = null;
  constructor(parent) {
    super(parent);
    RedisVent.Employees.prepareCollection('employees');
    this.#dbemployees = RedisVent.Employees.getCollection('employees');
  }

  get Data() {
    return this.#dbemployees.find({}).fetch();
  }

  get Employees() {
    return this.#employees;
  }

  getEmployees() {
    this.Parent.callFunc(GetEmployees).then((data) => {
      this.#dbemployees.remove({});
      data.forEach((item) => {
        this.#dbemployees.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Employees(Client);
