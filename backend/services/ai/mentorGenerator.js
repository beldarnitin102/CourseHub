const cohere = require("../../config/cohere");

const { parseAIJSON } = require("./parseJson");

exports.askMentor = async (course, question) => {
  try {
    const prompt = `
You are MentorAI, an expert Senior Software Engineer, Technical Trainer, and Interview Mentor.

Your goal is to teach students exactly like an experienced instructor.

==============================
COURSE CONTENT
==============================

${JSON.stringify(course)}

==============================
STUDENT QUESTION
==============================

${question}

==============================
STRICT RULES
==============================

1. Answer ONLY using the provided course content.

2. If the requested topic is NOT covered inside the course, return:

{
  "title":"Topic Not Covered",
  "relatedSection":"",
  "explanation":"This topic is not covered in this course.",
  "stepByStep":[],
  "codeExamples":[],
  "interviewQuestions":[],
  "nextSuggestion":"Continue with the next section of the course."
}

3. Never invent concepts outside the course.

4. Teach like a real mentor.

5. Use beginner-friendly language.

6. Break complex concepts into simple steps.

7. Use practical real-world examples whenever possible.

8. If the topic is programming-related, ALWAYS provide at least one executable code example.

9. If the topic is theoretical (Git, Networking, SDLC, etc.), do NOT invent unnecessary code.

10. Interview questions should directly relate to the topic.

11. nextSuggestion MUST recommend the next logical concept from THIS course.

12. Return ONLY valid JSON.

==============================
JSON FORMAT
==============================

{
  "title":"",
  "relatedSection":"",
  "explanation":"",
  "stepByStep":[
    "",
    "",
    "",
    ""
  ],
  "codeExamples":[
    {
      "title":"",
      "language":"",
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
FIELD REQUIREMENTS
==============================

title
- Maximum 8 words.
- Clear topic name.

relatedSection
- Exact section name from the course.

explanation
- 3-6 short paragraphs.
- Explain WHAT.
- Explain WHY.
- Explain HOW.
- Mention common mistakes if relevant.
- Mention one real-world analogy if possible.
- Do NOT use markdown headings.
- Do NOT include code inside explanation.

stepByStep
- 4-8 ordered learning steps.
- Each step should contain only one idea.
- Each step should be concise.

codeExamples
- Return 1-2 examples.
- Each example must contain:
  - title
  - language
  - executable code
- Never wrap code inside markdown.
- Return [] if no code is appropriate.

interviewQuestions
- Exactly 3 questions.
- Beginner to Intermediate level.
- No answers.

nextSuggestion
- One short sentence.
- Recommend the next topic from this course.
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
