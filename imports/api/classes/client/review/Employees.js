import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetEmployees, AddMember } from '../../../common';

class Employees extends Watcher {
  #employees = null;
  #dbemployees = null;
  #listen = null;
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

  addMember(data) {
    this.Parent.callFunc(AddMember, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Employees.listen('employees', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
  }

  getEmployees(datas) {
    this.Parent.callFunc(GetEmployees, datas).then((data) => {
      this.#dbemployees.remove({});
      data.forEach((item) => {
        this.#dbemployees.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Employees(Client);
