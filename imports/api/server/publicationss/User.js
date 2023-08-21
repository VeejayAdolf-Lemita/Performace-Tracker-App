import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('users', function () {
    return Meteor.users.find(
      { _id: this.userId },
      { fields: { emails: 1, profile: 1, roles: 1, service: 1 } },
    );
  });
}
