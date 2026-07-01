const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateRecommendations = async (
  course,
  completedSections,
  progress
) => {
  try {

    const prompt = `
You are an expert AI Career Mentor.

Student has completed:

Course:
${JSON.stringify(course)}

Completed Sections:
${JSON.stringify(completedSections)}

Progress:
${progress}%

Recommend ONLY the NEXT BEST THINGS to learn.

Recommendations must include

Next Skills

Next Courses

Next Projects

Documentation

Interview Topics

Career Advice

Return ONLY valid JSON.

{
  "nextSkills":[],
  "recommendedCourses":[],
  "recommendedProjects":[],
  "documentation":[],
  "interviewTopics":[],
  "careerAdvice":""
}
`;

    const response = await cohere.chat({

      model:"command-a-03-2025",

      messages:[
        {
          role:"user",
          content:prompt
        }
      ],

      responseFormat:{
        type:"json_object",

        schema:{
          type:"object",

          properties:{

            nextSkills:{
              type:"array",
              items:{type:"string"}
            },

            recommendedCourses:{
              type:"array",
              items:{type:"string"}
            },

            recommendedProjects:{
              type:"array",
              items:{type:"string"}
            },

            documentation:{
              type:"array",
              items:{type:"string"}
            },

            interviewTopics:{
              type:"array",
              items:{type:"string"}
            },

            careerAdvice:{
              type:"string"
            }

          },

          required:[
            "nextSkills",
            "recommendedCourses",
            "recommendedProjects",
            "documentation",
            "interviewTopics",
            "careerAdvice"
          ]
        }
      },

      temperature:0.3

    });

    return parseAIJSON(response.message.content[0].text);

  } catch(err){
    throw err;
  }
};