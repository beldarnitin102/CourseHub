const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateQuiz = async (courseData) => {
  try {
    const prompt = `
Generate a professional quiz for this course.

${JSON.stringify(courseData)}

Generate exactly 20 Multiple Choice Questions (MCQs).

Each MCQ must include:
- Question
- 4 options
- Correct answer (must match one of the 4 options exactly)
- Explanation
`;

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  options: { 
                    type: "array", 
                    items: { type: "string" } // ✅ FIX: Removed minItems and maxItems
                  },
                  correctAnswer: { type: "string" },
                  explanation: { type: "string" }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      },
      temperature: 0.3,
    });

return parseAIJSON(response.message.content[0].text);

  } catch (err) {
    console.error(err);
    throw err;
  }
};
