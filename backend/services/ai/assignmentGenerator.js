const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateAssignments = async (courseData) => {
  try {
    const prompt = `
Generate exactly 5 practical assignments.

${JSON.stringify(courseData)}

Each assignment must include:
- Title
- Difficulty
- Objective
- Tasks
- Expected Output
- Evaluation Criteria
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

      // ✅ FIX 2: Mandates the model output a structured array of assignments
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            assignments: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  difficulty: { type: "string" },
                  objective: { type: "string" },
                  tasks: { type: "array", items: { type: "string" } },
                  expectedOutput: { type: "string" },
                  evaluationCriteria: { type: "array", items: { type: "string" } }
                },
                required: ["title", "difficulty", "objective", "tasks", "expectedOutput", "evaluationCriteria"]
              }
            }
          },
          required: ["assignments"]
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
