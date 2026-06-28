const User = require("../../models/User");

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

exports.deleteUser = async (req, res) => {

    try {

        const { userId } = req.params;

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "User Deleted",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};