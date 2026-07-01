const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateInterview = async (course) => {
  try {
    const prompt = `
You are a Senior Software Engineer.

Generate a complete interview preparation kit for this course.

Course:

${JSON.stringify(course)}

Generate:

- Beginner Questions
- Intermediate Questions
- Advanced Questions
- Coding Questions
- HR Questions

For every technical question include

Question

Answer

Difficulty

Hints

Expected Concepts

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
    throw err;
  }
};