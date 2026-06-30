const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseDescirption: {
    type: String,
  },
  instructor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  whatYouWillLearn: {
    type: String,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  aiResources: {

    notes: {
        type: Object,
        default: {}
    },

    quiz: {
        type: Object,
        default: {}
    },

    assignments: {
        type: Object,
        default: {}
    },

    roadmap: {
        type: Object,
        default: {}
    },

    projects: {
        type: Object,
        default: {}
    },
     documentation:{
        type:Object,
        default:{}
    }

},
});

module.exports = mongoose.model("Course", CourseSchema);
