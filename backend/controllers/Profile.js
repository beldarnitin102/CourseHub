const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.UpdateProfile = async (req, res) => {
  try {
    const { dataOfBirth = "", about = "", contactNumber, gender } = req.body;

    const id = req.user.id;

    if (!contactNumber || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //findProfile
    const userdetails = await User.findById(id);
    const profileId = userdetails.additionalDetails;

    const profileDetails = await Profile.findById(profileId);

    profileDetails.dataOfBirth = dataOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: " Profile updated succesfully",
      profileDetails,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "getting error in updating the Profile",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: " User not found ",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);

    await User.findByIdAndDelete({ _id: id });

    //todo unrolll user from all enrolled courses

    //what is chrone job
    return res.status(200).json({
      success: true,
      message: " User deleted succesfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be deletd getting error ",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: " User data fetch succsfully ",
      data: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: " User details fetch error  ",
    });
  }
};


exports.updateDisplayPicture = async (req, res) => {
  try {

    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    
    const displayPicture = req.files.displayPicture;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      req.user.id,
      {
        image: image.secure_url,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Error while updating display picture",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
   console.log("USER ID:", userId);
    const userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
        },
      })
      .exec();
        console.log(
      "ENROLLED COURSES:",
      userDetails.courses
    );

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Could not fetch enrolled courses",
    });
  }
};
