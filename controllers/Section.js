const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    //data validadtion
    // create section
    // update course with section objectId
    // return responce

    const { sectionName, courseId } = req.body;

    

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true },
    )
      .populate("")
      .exec();

    return res.status(200).json({
      success: true,
      message: "section created succesfully",
      updatedCourseDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to create a section pleased try again",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data input

    const { sectionName, SectionId } = req.body;
    // data validation

    if (!sectionName || SectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    // update data

    const section = await Section.findByIdAndUpdate(
      SectionId,
      { sectionName },
      { new: true },
    );
    // return res

    return res.status(200).json({
      success: true,
      message: "section updated succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to update a section, pleased try again",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { SectionId } = req.params;

    await section.findByIdAndDelete(SectionId);
    //we need to delete the entry from course schema

    return res.status(200).json({
      success: true,
      message: "section deleted succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete a section, pleased try again",
    });
  }
};
