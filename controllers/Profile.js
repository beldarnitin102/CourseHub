const Profile = require("../models/Profile");
const User = require("../models/User");

exports.UpdateProfile = async (req, res) => {
  try {
    const { dataOfBirth = "", about = "", contactNumber, gender } = req.body;

    const id = req.user.id;

    if (!contactNumberm || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //findProfile
    const userdetails = await User.findById(id);
    const profileId = userdetails.additionalDetails;

    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
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
    console.log(err);
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
    await Profile.findByIdAndDelete({ id: userDetails.additionalDetails });

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
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: " User details fetch error  ",
    });
  }
};

