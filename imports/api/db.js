import { Mongo } from 'meteor/mongo';

export const ProductivityCollection = new Mongo.Collection('productivity');
export const GoalsCollection = new Mongo.Collection('goals');
export const ActivityCollection = new Mongo.Collection('employee-activity');
export const RatingCollection = new Mongo.Collection('ratings');

export const ReviewCollection = new Mongo.Collection('reviews');
export const EmployeesCollection = new Mongo.Collection('employee');
