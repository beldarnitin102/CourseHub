const Category = require("../models/Category");

exports.createCatgorey = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tagsDetails = await Category.create({
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
    const allTags = await Category.find({}, { name: true, description: true });

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

    const selectCatogory = await Category.findById(categoryId)
      .populate("Courses")
      .exec();

    if (!selectCatogory) {
      return res.status(404).json({
        success: false,
        message: "data not found ",
      });
    }

    const diffCategries = await Category.find({
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
