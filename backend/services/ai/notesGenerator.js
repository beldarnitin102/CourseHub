const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateNotes = async (courseData) => {
  try {
    const prompt = `
You are an expert technical instructor.

Generate professional study notes for this online course.

Course:
${JSON.stringify(courseData)}

Requirements:

- Summary
- Key Concepts
- Important Definitions
- Best Practices
- Common Mistakes
- Revision Points
- Cheat Sheet
`;

    const response = await cohere.chat({
      // ✅ FIX 1: Use an active, supported model
      model: "command-a-03-2025", 

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      // ✅ FIX 2: Guarantees the AI strictly responds with valid JSON matching your schema
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            summary: { type: "string" },
            keyConcepts: { type: "array", items: { type: "string" } },
            definitions: { type: "array", items: { type: "string" } },
            bestPractices: { type: "array", items: { type: "string" } },
            commonMistakes: { type: "array", items: { type: "string" } },
            revisionPoints: { type: "array", items: { type: "string" } },
            cheatSheet: { type: "array", items: { type: "string" } }
          },
          required: ["summary", "keyConcepts", "definitions", "bestPractices", "commonMistakes", "revisionPoints", "cheatSheet"]
        }
      },

      temperature: 0.3,
    });

    
return parseAIJSON(response.message.content[0].text);


  } catch (err) {
    console.log(err);
    throw err;
  }
};
