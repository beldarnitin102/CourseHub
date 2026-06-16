const Catgorey = require("../models/Catgorey");
const { create } = require("../models/User");

exports.createCatgorey = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tagsDetails = await Catgorey.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "tags created succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error getting in tags creation ",
    });
  }
};

exports.showAllCatgorey = async (req, res) => {
  try {
    const allTags = await Catgorey.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All tags return succesfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "error getting in showing all tags ",
    });
  }
};

exports.categoriesPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectCatogory = await Catgorey.findById(categoryId)
      .populate("Courses")
      .exec();

    if (!selectCatogory) {
      return res.status(404).json({
        success: false,
        message: "data not found ",
      });
    }

    const diffCategries = await Catgorey.find({
      _id: { $ne: categoryId },
    })
      .populate("Courses")
      .exec();

    //get top selling courses hw
    //top courses also hw

    return res.status(200).json({
      success: true,
      data: {
        selectCatogory,
        diffCategries,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
