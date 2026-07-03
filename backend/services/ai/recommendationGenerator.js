const cohere = require("../../config/cohere");
const { parseAIJSON } = require("./parseJson");

exports.generateRecommendations = async (
  course,
  completedSections,
  progress,
) => {
  try {
    // Prompt ko chota aur clean banaya taaki model data size exceed na kare
    const simplifiedCourse = {
      title: course.courseName,
      description: course.courseDescription,
    };

    const prompt = `
You are an expert AI Career Mentor.
Student has completed:
Course: ${JSON.stringify(simplifiedCourse)}
Completed Sections: ${JSON.stringify(completedSections || [])}
Progress: ${progress || 0}%

Recommend ONLY the NEXT BEST THINGS to learn.
Return ONLY valid JSON layout matching the requested schema fields.
`;

    const response = await cohere.chat({
      model: "command-a-plus-05-2026",

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
            nextSkills: { type: "array", items: { type: "string" } },
            recommendedCourses: { type: "array", items: { type: "string" } },
            recommendedProjects: { type: "array", items: { type: "string" } },
            documentation: { type: "array", items: { type: "string" } },
            interviewTopics: { type: "array", items: { type: "string" } },
            careerAdvice: { type: "string" },
          },
          required: [
            "nextSkills",
            "recommendedCourses",
            "recommendedProjects",
            "documentation",
            "interviewTopics",
            "careerAdvice",
          ],
        },
      },
      temperature: 0.3,
    });

    let aiText = "";

    if (response?.message?.content && Array.isArray(response.message.content)) {
      // Find the item in the array where type is "text"
      const textBlock = response.message.content.find(
        (block) => block.type === "text",
      );
      if (textBlock && textBlock.text) {
        aiText = textBlock.text;
      }
    }

    // Emergency backup check for older SDK versions
    if (!aiText) {
      aiText = response?.text || response?.message?.text || "";
    }

    aiText = aiText.trim();

    if (!aiText) {
      console.error(
        "❌ Cohere API Parsing Failed. Full Response Object Structure:",
        JSON.stringify(response, null, 2),
      );
      throw new Error("Empty text chunk received from Cohere API.");
    }

    return parseAIJSON(aiText);
  } catch (err) {
    console.log(
      "⚠️ Service Error caught. Loading offline structural fallback standard data:",
      err.message,
    );

    // 🛡️ Safe Fallback Layer: Node process up rahegi aur system data bypass hoga
    return {
      nextSkills: [
        "Advanced Clean Architecture Patterns",
        "State Management Handlers",
      ],
      recommendedCourses: [
        `Complete Guide to Production Ready ${course.courseName || "Development"}`,
      ],
      recommendedProjects: [
        "E-Commerce Mockup Platform API Layer",
        "Scalable Multi-Client Socket Gateway",
      ],
      documentation: [
        "Official MDN Docs",
        "Developer Integration Framework Guideline Reference",
      ],
      interviewTopics: [
        "System Optimization Paradigms",
        "Asynchronous Runtime Logic Flows",
      ],
      careerAdvice:
        "Excellent track record so far! Keep focusing on core practical system builds and debugging techniques.",
    };
  }
};
