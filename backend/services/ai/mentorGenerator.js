const cohere = require("../../config/cohere");

const { parseAIJSON } = require("./parseJson");

exports.askMentor = async (course, question) => {
  try {
    const prompt = `
You are MentorAI, an expert software engineering mentor.

Your job is to teach students using ONLY the course content provided below.

==============================
COURSE
==============================

${JSON.stringify(course)}

==============================
STUDENT QUESTION
==============================

${question}

==============================
IMPORTANT RULES
==============================

1. Answer ONLY from the provided course.

2. If the answer does not exist in the course, return:

"This topic is not covered in this course."

3. Explain like an experienced mentor teaching a beginner.

4. Never invent concepts that are not present in the course.

5. If useful, include simple analogies.

6. Give practical examples.

7. Code examples should be short, clean and executable.

8. Interview questions should be based on the topic.

9. Keep explanations concise but educational.

10. Return ONLY valid JSON.

==============================
RETURN THIS JSON
==============================

{
  "title":"",

  "relatedSection":"",


  "explanation":"",

  "stepByStep":[
    "",
    "",
    ""
  ],

  "codeExamples":[
    {
      "title":"",
      "language":"JavaScript",
      "code":""
    }
  ],

  "interviewQuestions":[
    "",
    "",
    ""
  ],

  "nextSuggestion":""
}

==============================
FIELD RULES
==============================

title
- Short topic title.

relatedSection
- Exact course section name.


explanation
- 2-5 paragraphs.
- Simple language.
- Explain the concept naturally.

stepByStep
- Explain the learning process in logical order.

codeExamples
- Only include if programming related.
- Maximum 2 examples.

interviewQuestions
- 3 questions.
- Easy to Medium difficulty.

nextSuggestion
- Recommend the next concept from THIS course.
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
            title: {
              type: "string",
            },

            relatedSection: {
              type: "string",
            },

          

            explanation: {
              type: "string",
            },

            stepByStep: {
              type: "array",
              items: {
                type: "string",
              },
            },

            codeExamples: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  language: {
                    type: "string",
                  },
                  code: {
                    type: "string",
                  },
                },
                required: ["title", "language", "code"],
              },
            },

            interviewQuestions: {
              type: "array",
              items: {
                type: "string",
              },
            },

            nextSuggestion: {
              type: "string",
            },
          },

          required: [
            "title",
            "relatedSection",
            "explanation",
            "stepByStep",
            "codeExamples",
            "interviewQuestions",
            "nextSuggestion",
          ],
        },
      },

      temperature: 0.3,
    });

    return parseAIJSON(response.message.content[0].text);
  } catch (err) {
    throw err;
  }
};
