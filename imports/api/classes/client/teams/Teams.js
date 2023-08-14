import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetTeams, AddTeam } from '../../../common';

class Teams extends Watcher {
  #teams = null;
  #dbteams = null;
  #listen = null;
  constructor(parent) {
    super(parent);
    RedisVent.Teams.prepareCollection('teams');
    this.#dbteams = RedisVent.Teams.getCollection('teams');
  }

  get Data() {
    return this.#dbteams.find({}).fetch();
  }

  get Teams() {
    return this.#teams;
  }

  addTeam(data) {
    this.Parent.callFunc(AddTeam, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Teams.listen('teams', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
  }

  getTeams(datas) {
    this.Parent.callFunc(GetTeams, datas).then((data) => {
      this.#dbteams.remove({});
      data.forEach((item) => {
        this.#dbteams.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Teams(Client);
