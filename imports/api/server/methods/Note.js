import { NotesCollection } from '../../db';
import { GetNotes, AddNote } from '../../common';
import moment from 'moment';
import { check } from 'meteor/check';
import RedisVent from '../RedisVent';

if (Meteor.isServer) {
  Meteor.methods({
    [GetNotes]: function (goalId) {
      const test = NotesCollection.find({ goalId })
        .fetch()
        .map((data) => data)
        .sort((a, b) => b.timestamp - a.timestamp);

      return test;
    },
    [AddNote]: function (data) {
      try {
        check(data, Object);
        data.timestamp = moment().valueOf();
        const id = NotesCollection.insert(data);
        data._id = id._str;
        console.info(
          'Notes.js call[%s]: %s at %s',
          AddNote,
          `New Note Added! ID: ${data._id}`,
          moment(data.timestamp),
        );
        RedisVent.Notes.triggerInsert('notes', '123', data);
      } catch (error) {
        console.error(AddNote, error);
      }
    },
  });
}
