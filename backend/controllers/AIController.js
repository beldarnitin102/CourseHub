const {
  extractPlaylistId,
  getPlaylistVideos,
} = require("../services/youtubeService");

const groq = require("../config/groq");

const { createCourseFromAI } = require("../services/courseGenerator");
const { generateNotes } = require("../services/ai/notesGenerator");
const { generateQuiz } = require("../services/ai/quizGenerator");
const { generateAssignments } = require("../services/ai/assignmentGenerator");
const { generateRoadmap } = require("../services/ai/roadmapGenerator");
const { generateProjects } = require("../services/ai/projectGenerator");
const {
  generateDocumentation,
} = require("../services/ai/documentationGenerator");

exports.generateCourseFromPlaylist = async (req, res) => {
  try {
    const { playlistUrl, categoryId } = req.body;

    // ── 1. Validate inputs ──────────────────────────────────────────
    if (!playlistUrl) {
      return res.status(400).json({
        success: false,
        message: "playlistUrl is required",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "categoryId is required",
      });
    }

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid YouTube playlist URL. Make sure it contains a 'list' parameter.",
      });
    }

    // ── 2. Fetch all playlist videos ────────────────────────────────
    const videos = await getPlaylistVideos(playlistId);

    if (!videos || videos.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No public videos found in this playlist. The playlist may be empty or private.",
      });
    }

    const playlistData = videos.map((video) => ({
      videoId: video.videoId,
      title: video.title,
      description: video.description
        ? video.description.slice(0, 300) // trim to avoid token bloat
        : "",
    }));

    // ── 3. Call Groq LLM ────────────────────────────────────────────
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }, // forces strictly valid JSON
      messages: [
        {
          role: "system",
          content: `You are an expert online course designer. Given a list of YouTube playlist videos (with videoId, title, and description), create a well-structured online course by grouping the videos into logical sections (chapters/modules).

Output ONLY valid JSON with NO markdown fences, NO extra text, and NO trailing commas. Strictly follow this schema:

{
  "courseName": "<concise, marketable course title>",
  "courseDescription": "<engaging 2-3 sentence description of what the course covers and who it's for>",
  "whatYouWillLearn": [
    "<learning outcome 1>",
    "<learning outcome 2>",
    "<learning outcome 3>",
    "<learning outcome 4>",
    "<learning outcome 5>"
  ],
  "tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>", "<tag5>"],
  "sections": [
    {
      "sectionName": "<module/chapter name>",
      "lectures": [
        {
          "videoId": "<exact videoId from input>",
          "title": "<lecture title (can refine the original video title)>",
          "description": "<1-2 sentence description of what this lecture covers>",
          "videoUrl": "https://www.youtube.com/watch?v=<videoId>"
        }
      ]
    }
  ]
}

Rules:
- Every input video MUST appear exactly once across all sections.
- Use the exact videoId values provided; do NOT invent or alter them.
- Group videos into 3-8 logical sections based on topic progression.
- Each section should contain at least 1 lecture.
- Tags should reflect the core technology/subject areas of the course.
- whatYouWillLearn should describe concrete skills the student will gain.`,
        },
        {
          role: "user",
          content: `Create a structured course from this YouTube playlist:\n\n${JSON.stringify(playlistData, null, 2)}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 4096,
    });

    // ── 4. Parse AI response ────────────────────────────────────────
    let rawContent = completion.choices[0].message.content;

    // Safety net: extract the outermost JSON object in case of stray text
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({
        success: false,
        message: "AI returned an unexpected format. Please try again.",
      });
    }
    rawContent = jsonMatch[0];

    let aiResponse;
    try {
      aiResponse = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("[AIController] JSON parse error:", parseError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response as JSON. Please try again.",
      });
    }

    // Validate that the AI returned the required fields
    if (
      !aiResponse.courseName ||
      !aiResponse.sections ||
      !Array.isArray(aiResponse.sections)
    ) {
      return res.status(500).json({
        success: false,
        message:
          "AI response is missing required fields (courseName or sections).",
      });
    }

    // ── 5. Persist course to DB ─────────────────────────────────────
    // ── 5. Generate Additional AI Resources ───────────────────────────

    const aiResources = {};

    // Documentation (instant, no AI)
    aiResources.documentation = generateDocumentation(aiResponse.tags || []);

    try {
      const [notes, quiz, assignments, roadmap, projects] = await Promise.all([
        generateNotes(aiResponse),
        generateQuiz(aiResponse),
        generateAssignments(aiResponse),
        generateRoadmap(aiResponse),
        generateProjects(aiResponse),
      ]);

      aiResources.notes = notes;
      aiResources.quiz = quiz;
      aiResources.assignments = assignments;
      aiResources.roadmap = roadmap;
      aiResources.projects = projects;
    } catch (resourceError) {
      console.error("AI Resource Generation Failed:", resourceError);

      aiResources.notes = {};
      aiResources.quiz = {};
      aiResources.assignments = {};
      aiResources.roadmap = {};
      aiResources.projects = {};
    }

    // ── 6. Save Complete Course ─────────────────────────────

    const createdCourse = await createCourseFromAI(
      aiResponse,

      videos,

      req.user.id,

      categoryId,

      aiResources,
    );

    return res.status(200).json({
      success: true,
      message: `Course "${aiResponse.courseName}" generated successfully with ${aiResponse.sections.length} sections and ${videos.length} lectures.`,
      data: createdCourse,
    });
  } catch (error) {
    console.error("[AIController] Error generating course:", error);
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while generating the course.",
    });
  }
};
