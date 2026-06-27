const LectureNote = require("../models/LectureNote");

exports.saveNote = async (req, res) => {
  try {
    const { courseId, lectureId, note } = req.body;

    const userId = req.user.id;

    const existingNote = await LectureNote.findOne({
      user: userId,
      course: courseId,
      lecture: lectureId,
    });

    if (existingNote) {
      existingNote.note = note;
      await existingNote.save();

      return res.status(200).json({
        success: true,
        data: existingNote,
      });
    }

    const newNote = await LectureNote.create({
      user: userId,
      course: courseId,
      lecture: lectureId,
      note,
    });

    return res.status(200).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    const note = await LectureNote.findOne({
      user: req.user.id,
      course: courseId,
      lecture: lectureId,
    });

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};