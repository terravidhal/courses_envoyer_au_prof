const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema(
  {
     name: {
       type: String,
       required: [true, "A Course name is required"],
       minlength: [3, "A Course name must be atleast three characters long"],
       maxlength: [20, "The name of a meal must have a maximum of twenty characters"],
     },
     level: {
      type: Number,
      required: [true, "A level is required"],
      min: [1, "level must be a minimum of 1"],
      max: [5, "level should be no more than 5"],
     },
     description: {
       type: String,
       required: [true, "A description is required"],
       minlength: [10, "description must be at least 10 characters long"],
     },
     instructor: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
     },
     dayOfWeek: {
       type: String,
       required: true,
       minlength: [3, "A dayOfWeek must be atleast three characters long"],
       maxlength: [8, "The dayOfWeek must have a maximum of twenty characters"],
     },
     time: {
      type: Number,
      required: [true, "A  time is required"],
      min: [30, " time must be a minimum of 30 minutes"],
      max: [240, " time should be no more than 240 minutes."],
     },
     students: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
     }],
  },
  { timestamps: true }
);


 
const Course = mongoose.model('Course', CourseSchema);
 
module.exports = Course;