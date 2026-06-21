const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createSubSection = async (req, res) => {
  try {
    // data fetch
    // extract file/Video
    // validation
    // uplod video to cloudinary
    // create subsection
    // update section with the subsection

    const { sectionId, title, timeduration, description } = req.body;

    const video = req.files.videoFile;

    if (!sectionId || !title || !timeduration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );

    const SubsectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeduration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    const updateSection = await Section.findByIdAndUpdate(sectionId,
      {
        $push: {
          subSection: SubsectionDetails._id,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Subsection created succesfully",
      updateSection,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "getting error in the Subsection creation ",
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

