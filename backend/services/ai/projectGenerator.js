const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateProjects = async (courseData) => {
  try {

    const prompt = `
You are a Senior Software Architect.

Based on this course:

${JSON.stringify(courseData)}

Generate exactly FOUR real-world software projects.

Project Levels:

1 Beginner

1 Intermediate

1 Advanced

1 Industry Level

Each project MUST contain:

- title
- difficulty
- description
- problemStatement
- features
- techStack
- folderStructure
- databaseSchema
- apiList
- implementationSteps
- deployment
- learningOutcome

Return ONLY valid JSON.

{
  "projects":[
    {
      "title":"",

      "difficulty":"",

      "description":"",

      "problemStatement":"",

      "features":[
        ""
      ],

      "techStack":[
        ""
      ],

      "folderStructure":[
        ""
      ],

      "databaseSchema":[
        ""
      ],

      "apiList":[
        ""
      ],

      "implementationSteps":[
        ""
      ],

      "deployment":"",

      "learningOutcome":""
    }
  ]
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

                  problemStatement: { type: "string" },

                  features: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  techStack: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  folderStructure: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  databaseSchema: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  apiList: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  implementationSteps: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  deployment: {
                    type: "string",
                  },

                  learningOutcome: {
                    type: "string",
                  },

                },

                required: [
                  "title",
                  "difficulty",
                  "description",
                  "problemStatement",
                  "features",
                  "techStack",
                  "folderStructure",
                  "databaseSchema",
                  "apiList",
                  "implementationSteps",
                  "deployment",
                  "learningOutcome"
                ],

              },

            },

          },

          required: [
            "projects"
          ],

        },

      },

      temperature: 0.35,

    });

    return parseAIJSON(response.message.content[0].text);

  } catch (err) {

    console.log(err);

    throw err;

  }
};