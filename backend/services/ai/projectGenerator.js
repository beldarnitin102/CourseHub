const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateProjects = async (courseData) => {
  try {
    const prompt = `
Generate real-world projects.

${JSON.stringify(courseData)}

Generate:
- Beginner Project
- Intermediate Project
- Advanced Project
- Industry Project

Each contains:
- Title
- Difficulty
- Description
- Requirements
- Tech Stack
- Learning Outcome
`;

    const response = await cohere.chat({
      // ✅ FIX 1: Use an active, supported production model
      model: "command-a-03-2025",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      // ✅ FIX 2: Mandates the model output valid JSON matching your exact array structure
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  difficulty: { type: "string" },
                  description: { type: "string" },
                  requirements: { type: "array", items: { type: "string" } },
                  techStack: { type: "array", items: { type: "string" } },
                  learningOutcome: { type: "string" }
                },
                required: ["title", "difficulty", "description", "requirements", "techStack", "learningOutcome"]
              }
            }
          },
          required: ["projects"]
        }
      },

      temperature: 0.3,
    });

return parseAIJSON(response.message.content[0].text);


  } catch (err) {
    console.error(err); // Good practice to log errors locally before throwing
    throw err;
  }
};
