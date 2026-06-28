const Course = require("../../models/Course");

exports.getAllCourses = async (req, res) => {

    try {

        const courses = await Course.find()
            .populate("instructor")
            .populate("category")
            .sort({
                createdAt: -1,
            });

        return res.status(200).json({
            success: true,
            data: courses,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

exports.deleteCourse = async (req, res) => {

    try {

        const { courseId } = req.params;

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success: true,
            message: "Course Deleted",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};