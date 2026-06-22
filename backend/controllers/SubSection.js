const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createSubSection = async (req, res) => {
try {
const {
sectionId,
title,
timeduration,
description,
videoUrl,
} = req.body;

let finalVideoUrl = "";

// Validation
if (
  !sectionId ||
  !title ||
  !timeduration ||
  !description
) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields",
  });
}

// Option 1: YouTube URL
if (videoUrl) {
  finalVideoUrl = videoUrl;
}

// Option 2: Uploaded video
else if (
  req.files &&
  req.files.videoFile
) {
  const video =
    req.files.videoFile;

  const uploadDetails =
    await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

  finalVideoUrl =
    uploadDetails.secure_url;
}

else {
  return res.status(400).json({
    success: false,
    message:
      "Provide either videoUrl or videoFile",
  });
}

const subSection =
  await SubSection.create({
    title,
    description,
    timeDuration:
      timeduration,
    videoUrl: finalVideoUrl,
  });

const updatedSection =
  await Section.findByIdAndUpdate(
    sectionId,
    {
      $push: {
        subSection:
          subSection._id,
      },
    },
    { new: true }
  ).populate("subSection");

return res.status(200).json({
  success: true,
  message:
    "Lecture created successfully",
  data: updatedSection,
});


} catch (err) {
console.log(err);


return res.status(500).json({
  success: false,
  message:
    "Error creating subsection",
});


}
};



exports.updateSubSection = async (req,res) => {
  try {
    
  } catch (err) {
    
  }
}

exports.deleteSubSection = async (req,res) => {
  try {
    
  } catch (err) {
    
  }
}
//todo update subsection and delete subsection 

