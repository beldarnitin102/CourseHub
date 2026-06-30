const Course = require("../models/Course");
const cohere = require("../config/cohere");

exports.askMentor = async (req, res) => {
  try {
    const { courseId, question } = req.body;

    if (!courseId || !question) {
      return res.status(400).json({
        success: false,
        message: "courseId and question are required",
      });
    }

    const course = await Course.findById(courseId)
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

    const context = {
      courseName: course.courseName,
      description: course.courseDescirption,
      whatYouWillLearn: course.whatYouWillLearn,
      sections: course.courseContent.map((section) => ({
        sectionName: section.sectionName,
        lectures: section.subSection.map((lecture) => ({
          title: lecture.title,
          description: lecture.description,
        })),
      })),
    };

    const prompt = `
You are an Expert AI Mentor.

You are helping a student enrolled in this course.

Course Context:

${JSON.stringify(context)}

Student Question:

${question}

Instructions:

- Give a beginner friendly answer.
- Explain concepts step by step.
- Give real-world examples.
- If coding is involved, include code snippets.
- Suggest best practices.
- Suggest what to study next.
- Keep formatting clean.
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.3,
    });

    const answer = response.message.content[0].text;

    return res.status(200).json({
      success: true,
      data: {
        question,
        answer,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get mentor response",
    });
  }
};