import { Vent } from 'meteor/cultofcoders:redis-oplog';

const EVENTS = [
  // default events
  'update',
  'insert',
  'remove',
  'upsert',
  //custom event
  'update-color',
];
class RedisVent {
  #pre;
  constructor() {}
  get Notifier() {
    this.#pre = 'notifier';
    return this;
  }
  get Attachment() {
    this.#pre = 'attachment';
    return this;
  }

  get Productivity() {
    this.#pre = 'productivity';
    return this;
  }

  get Goals() {
    this.#pre = 'goals';
    return this;
  }

  get GoalsWIndex() {
    this.#pre = 'goalswindex';
    return this;
  }

  get Activity() {
    this.#pre = 'activity';
    return this;
  }

  get Ratings() {
    this.#pre = 'ratings';
    return this;
  }

  get Reviews() {
    this.#pre = 'reviews';
    return this;
  }

  get Employees() {
    this.#pre = 'employees';
    return this;
  }

  get Replies() {
    this.#pre = 'replies';
    return this;
  }

  get Notes() {
    this.#pre = 'notes';
    return this;
  }

  get Bonuses() {
    this.#pre = 'bonuses';
    return this;
  }

  get Teams() {
    this.#pre = 'teams';
    return this;
  }

  get Timesheet() {
    this.#pre = 'timesheet';
    return this;
  }

  get Timeline() {
    this.#pre = 'timeline';
    return this;
  }

  get Attendance() {
    this.#pre = 'attendance';
    return this;
  }

  get ActivityLvl() {
    this.#pre = 'activityLvl';
    return this;
  }

  get Feedback() {
    this.#pre = 'feedback';
    return this;
  }

  get ActiveMember() {
    this.#pre = 'activemember';
    return this;
  }

  get ActiveMemberYesterday() {
    this.#pre = 'activememberyesterday';
    return this;
  }

  get ActiveMemberWeekly() {
    this.#pre = 'activememberweekly';
    return this;
  }

  publish() {
    const pub = function (namespace, key, id) {
      if (typeof this.userId != 'string') return this.ready();

      EVENTS.forEach((event) => {
        if (typeof id == 'string')
          this.on(`${namespace}::${key}::${id}::${event}`, (data) => {
            return { data, event };
          });
        else if (id instanceof Array)
          id.forEach((id_) => {
            this.on(`${namespace}::${key}::${id_}::${event}`, (data) => {
              return { data, event };
            });
          });
      });
      // ADD CUSTOM EVENTS HERE
      return this.ready();
    };
    console.log('Publishing to Redis Vent publications...');
    Vent.publish({
      listen({ namespace, key, id }) {
        pub.call(this, namespace, key, id);
      },
    });
    console.log('Done publishing events to Redis Vent publication...');
  }
  triggerUpdate(key, id, data) {
    if (this.#pre) {
      Vent.emit(`${this.#pre}::${key}::${id}::update`, { _id: id, data });
      this.#pre = null;
    }
  }
  triggerUpsert(key, id, data) {
    if (this.#pre) {
      Vent.emit(`${this.#pre}::${key}::${id}::upsert`, { _id: id, data });
      this.#pre = null;
    }
  }
  triggerInsert(key, id, data) {
    if (this.#pre) {
      Vent.emit(`${this.#pre}::${key}::${id}::insert`, { data });
      this.#pre = null;
    }
  }
  triggerRemove(key, id, data) {
    if (this.#pre) {
      Vent.emit(`${this.#pre}::${key}::${id}::remove`, { _id: data });
      this.#pre = null;
    }
  }
  triggerCustom(key, event, id, data) {
    if (this.#pre) {
      Vent.emit(`${this.#pre}::${key}::${id}::${event}`, { data });
      this.#pre = null;
    }
  }
}

export default new RedisVent();
