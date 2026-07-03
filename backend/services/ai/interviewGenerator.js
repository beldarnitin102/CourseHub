const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateInterview = async (course) => {
  try {
    const simplifiedCourse = {
      title: course.courseName,
      description: course.courseDescription,
      topics: course.courseContent?.map((section) => ({
        sectionName: section.sectionName,
        subSections: section.subSection?.map((sub) => sub.title),
      })),
    };

    const prompt = `
You are a Senior Software Engineer.
Generate a complete interview preparation kit for this course.

Course Details:
${JSON.stringify(simplifiedCourse)}

Generate:
- Beginner Questions
- Intermediate Questions
- Advanced Questions
- Coding Questions
- HR Questions

For every technical question include: Question, Answer, Difficulty, Hints, Expected Concepts.
Return ONLY valid JSON.

Schema:
{
  "beginner":[],
  "intermediate":[],
  "advanced":[],
  "coding":[],
  "hr":[]
}
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

    return parseAIJSON(response.message.content[0].text);
  } catch (err) {
    console.log("error in intrview services")

     return {
      beginner: [
        {
          question: `Welcome to the ${course.courseName} interview! What is the primary concept behind this technology?`,
          answer: "It is used for structural scalability and clean development implementations.",
          difficulty: "Beginner",
          hints: ["Think about basic lifecycle"],
          expectedConcepts: ["Fundamentals"]
        }
      ],
      intermediate: [],
      advanced: [],
      coding: [],
      hr: []
    };
  
  }
};
