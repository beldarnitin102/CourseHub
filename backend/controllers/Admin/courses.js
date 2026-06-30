const Course = require("../../models/Course");

exports.getAllCourses = async (req, res) => {

    try {

        const courses = await Course.find()
            .populate("instructor",
                 "firstName lastName email image"
            )
            .populate("category",
                "name"
            )
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

exports.getCourseDetailsAdmin = async (req, res) => {
    try {

        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate("instructor")
            .populate("category")
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

        return res.status(200).json({
            success: true,
            data: course,
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message,
        });

    }
};