const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateStudyPlanner = async (courseData) => {
  try {
    const prompt = `
You are an expert learning coach.

Create a personalized study plan for the following course.

Course:

${JSON.stringify(courseData)}

Instructions:

- Assume the student is a beginner.
- Divide the course into daily study sessions.
- Balance theory and practice.
- Include revision days.
- Include quiz days.
- Include assignment days.
- Recommend project milestones.
- Keep each day's workload realistic.

Return ONLY valid JSON.

Schema:

{
  "totalDuration":"",

  "dailyPlan":[
    {
      "day":1,

      "goal":"",

      "estimatedStudyTime":"",

      "sections":[
        ""
      ],

      "tasks":[
        ""
      ],

      "revision":false,

      "quiz":false,

      "assignment":false,

      "projectMilestone":""
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
            totalDuration: {
              type: "string",
            },

            dailyPlan: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  day: {
                    type: "number",
                  },

                  goal: {
                    type: "string",
                  },

                  estimatedStudyTime: {
                    type: "string",
                  },

                  sections: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  tasks: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },

                  revision: {
                    type: "boolean",
                  },

                  quiz: {
                    type: "boolean",
                  },

                  assignment: {
                    type: "boolean",
                  },

                  projectMilestone: {
                    type: "string",
                  },
                },

                required: [
                  "day",
                  "goal",
                  "estimatedStudyTime",
                  "sections",
                  "tasks",
                  "revision",
                  "quiz",
                  "assignment",
                  "projectMilestone",
                ],
              },
            },
          },

          required: [
            "totalDuration",
            "dailyPlan",
          ],
        },
      },

      temperature: 0.3,
    });

    return parseAIJSON(response.message.content[0].text);

  } catch (err) {
    console.log(err);
    throw err;
  }
};