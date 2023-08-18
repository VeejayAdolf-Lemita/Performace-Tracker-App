import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetActiveMember, GetActiveMemberYesterday, GetActiveMemberWeekly } from '../../../common';

class Insights extends Watcher {
  #activemembertoday = null;
  #dbactivemembertoday = null;
  #activememberyesterday = null;
  #dbactivememberyesterday = null;
  #activememberweekly = null;
  #dbactivememberweekly = null;
  constructor(parent) {
    super(parent);
    RedisVent.ActiveMember.prepareCollection('activemember');
    this.#dbactivemembertoday = RedisVent.ActiveMember.getCollection('activemember');
    RedisVent.ActiveMemberYesterday.prepareCollection('activememberyesterday');
    this.#dbactivememberyesterday =
      RedisVent.ActiveMemberYesterday.getCollection('activememberyesterday');
    RedisVent.ActiveMemberWeekly.prepareCollection('activememberweekly');
    this.#dbactivememberweekly = RedisVent.ActiveMemberWeekly.getCollection('activememberweekly');
  }

  get DataToday() {
    return this.#dbactivemembertoday.find({}).fetch();
  }

  get ActiveMember() {
    return this.#activemembertoday;
  }

  getActiveMember() {
    this.Parent.callFunc(GetActiveMember)
      .then((data) => {
        this.#dbactivemembertoday.remove({});
        if (data.length === 0) {
          console.log('No data found');
          return; // Exit the function if no data is found
        }
        data.forEach((item) => {
          // Add a unique _id field to each item before inserting
          item._id = new Meteor.Collection.ObjectID().toHexString();
          this.#dbactivemembertoday.insert(item);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  get DataYesterday() {
    return this.#dbactivememberyesterday.find({}).fetch();
  }

  get ActiveMemberYesterday() {
    return this.#activememberyesterday;
  }

  getActiveMemberYesterday() {
    this.Parent.callFunc(GetActiveMemberYesterday)
      .then((data) => {
        this.#dbactivememberyesterday.remove({});
        if (data.length === 0) {
          console.log('No data found');
          return; // Exit the function if no data is found
        }
        data.forEach((item) => {
          // Add a unique _id field to each item before inserting
          item._id = new Meteor.Collection.ObjectID().toHexString();
          this.#dbactivememberyesterday.insert(item);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  get DataWeekly() {
    return this.#dbactivememberweekly.find({}).fetch();
  }

  get ActiveMemberWeekly() {
    return this.#activememberweekly;
  }

  getActiveMemberWeekly() {
    this.Parent.callFunc(GetActiveMemberWeekly)
      .then((data) => {
        this.#dbactivememberweekly.remove({});
        if (data.length === 0) {
          console.log('No data found');
          return; // Exit the function if no data is found
        }
        data.forEach((item) => {
          // Add a unique _id field to each item before inserting
          item._id = new Meteor.Collection.ObjectID().toHexString();
          this.#dbactivememberweekly.insert(item);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}

export default new Insights(Client);
