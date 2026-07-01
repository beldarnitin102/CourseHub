const Course = require("../models/Course");
const { generateRecommendations } = require("../services/ai/recommendationGenerator");

exports.getRecommendations = async (req,res)=>{

try{

const {courseId,completedSections,progress}=req.body;

const course = await Course.findById(courseId)
  .populate({
    path: "courseContent",
    populate: {
      path: "subSection",
    },
  });

if (!course) {
  return res.status(404).json({
    success: false,
    message: "Course not found",
  });
}

const data=await generateRecommendations(
course,
completedSections,
progress
);

course.aiResources.recommendations = data;

await course.save();

return res.status(200).json({
success:true,
 message:"Recommendations generated successfully.",
data
});

}
catch(err){

return res.status(500).json({
success:false,
message:err.message
});

}

}