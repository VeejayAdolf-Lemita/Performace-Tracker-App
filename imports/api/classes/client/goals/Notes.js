import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetNotes, AddNote } from '../../../common';

class Notes extends Watcher {
  #notes = null;
  #dbnotes = null;
  #listen = null;
  constructor(parent) {
    super(parent);
    RedisVent.Notes.prepareCollection('notes');
    this.#dbnotes = RedisVent.Notes.getCollection('notes');
  }

  get Data() {
    return this.#dbnotes.find({}).fetch();
  }

  get Replies() {
    return this.#notes;
  }

  addNote(data) {
    this.Parent.callFunc(AddNote, data).catch((error) => console.log(error));
  }

  listen() {
    if (this.listen) {
      this.#listen = RedisVent.Notes.listen('replies', '123', ({ event, data }) => {
        console.log(event, data);
        switch (event) {
          case 'insert':
        }
      });
    }
    this.activateWatcher();
  }

  getNotes(data) {
    this.Parent.callFunc(GetNotes, data).then((datas) => {
      console.log(datas.goalId);
      this.#dbnotes.remove({});
      datas.forEach((item) => {
        this.#dbnotes.insert(item);
      });
      this.activateWatcher();
    });
  }
}

export default new Notes(Client);
