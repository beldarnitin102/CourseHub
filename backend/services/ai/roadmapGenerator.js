const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateRoadmap = async (courseData) => {
  try {
    const prompt = `
Create a complete learning roadmap.

${JSON.stringify(courseData)}

Include information structured across these core stages:
- Beginner
- Intermediate
- Advanced
- Expert

For each stage, detail its targeted projects, key milestones, and an estimated duration.
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

      // ✅ FIX 2: Mandates the model output a structured array of roadmap phases
      responseFormat: {
        type: "json_object",
        schema: {
          type: "object",
          properties: {
            roadmap: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  stage: { type: "string" }, // e.g., "Beginner", "Intermediate"
                  estimatedDuration: { type: "string" },
                  topics: { type: "array", items: { type: "string" } },
                  milestones: { type: "array", items: { type: "string" } },
                  suggestedProjects: { type: "array", items: { type: "string" } }
                },
                required: ["stage", "estimatedDuration", "topics", "milestones", "suggestedProjects"]
              }
            }
          },
          required: ["roadmap"]
        }
      },

      temperature: 0.3,
    });

    
    // Safety check: ensure the response structure exists before reading it
    if (!response || !response.message || !response.message.content || response.message.content.length === 0) {
      throw new Error("Empty or malformed response received from Cohere API.");
    }

    const rawText = response.message.content[0].text;
    
    if (!rawText) {
      throw new Error("Cohere response content did not contain any text.");
    }

    return parseAIJSON(rawText);



  } catch (err) {
    console.error(err);
    throw err;
  }
};
