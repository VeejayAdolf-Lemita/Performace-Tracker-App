import Watcher from '../Watcher';
import Client from '../Client';
import RedisVent from '../RedisVent';
import { GetActivityLevel } from '../../../common';

class ActivityLevel extends Watcher {
  #activitylevel = null;
  #dbactivitylevel = null;
  constructor(parent) {
    super(parent);
    RedisVent.ActivityLvl.prepareCollection('activityLvl');
    this.#dbactivitylevel = RedisVent.ActivityLvl.getCollection('activityLvl');
  }

  get Data() {
    return this.#dbactivitylevel.find({}).fetch();
  }

  get ActivityLvl() {
    return this.#activitylevel;
  }

  getActivityLvl(gte, lte) {
    // Call the GetActivityLevel function on the parent component
    this.Parent.callFunc(GetActivityLevel, gte, lte).then((data) => {
      // Remove all items from the dbactivitylevel collection
      this.#dbactivitylevel.remove({});

      // Iterate through the data returned by GetActivityLevel
      data.forEach((item) => {
        // Add a unique _id field to each item
        item._id = new Meteor.Collection.ObjectID().toHexString();

        // Insert the item into the dbactivitylevel collection
        this.#dbactivitylevel.insert(item);
      });

      // Check if the data length is 0
      if (data.length === 0) {
        // Alert the user
        alert('There is no data in between this date.');
      }
    });
  }
}

export default new ActivityLevel(Client);
