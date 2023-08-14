import { Mongo } from 'meteor/mongo';

export const ProductivityCollection = new Mongo.Collection('productivity');
export const GoalsCollection = new Mongo.Collection('goals');
export const ActivityCollection = new Mongo.Collection('employee-activity');
export const RatingCollection = new Mongo.Collection('ratings');

export const ReviewCollection = new Mongo.Collection('reviews');
export const EmployeesCollection = new Mongo.Collection('employee');
export const RepliesCollection = new Mongo.Collection('replies');
export const NotesCollection = new Mongo.Collection('notes');

export const BonusesCollection = new Mongo.Collection('bonuses');

export const TeamsCollection = new Mongo.Collection('departments');
export const AttendanceCollection = new Mongo.Collection('attendance');
