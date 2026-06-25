const {
  extractPlaylistId,
  getPlaylistVideos,
} = require("../services/youtubeService");
const groq = require("../config/groq");
const { createCourseFromAI } = require("../services/courseGenerator");

exports.generateCourseFromPlaylist = async (req, res) => {
  try {
    const { playlistUrl } = req.body;

    if (!playlistUrl) {
      return res.status(400).json({
        success: false,
        message: "Playlist URL required",
      });
    }

    const playlistId = extractPlaylistId(playlistUrl);

    if (!playlistId) {
      return res.status(400).json({
        success: false,
        message: "Invalid playlist URL",
      });
    }

    const videos = await getPlaylistVideos(playlistId);

    const titles = videos.map((video) => video.title);
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert course creator.

Generate valid JSON only.

Format:

{
  "courseName":"",
  "courseDescription":"",
  "whatYouWillLearn":[],
  "tags":[],
  "sections":[
    {
      "sectionName":"",
      "lectures":[]
    }
  ]
}
`,
        },

        {
          role: "user",
          content: JSON.stringify(titles),
        },
      ],

      temperature: 0.5,
    });

    let rawContent = completion.choices[0].message.content;

    // 2. SAFETY NET: Strip markdown backticks if the model still includes them
    rawContent = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    // 3. SAFE PARSE
    const aiResponse = JSON.parse(rawContent);

    const createdCourse = await createCourseFromAI(
      aiResponse,
      req.user.id,
      req.body.categoryId,
    );

    const generatedCourse = {
      courseName: aiResponse.courseName,

      courseDescription: aiResponse.courseDescription,

      whatYouWillLearn: aiResponse.whatYouWillLearn,

      tags: aiResponse.tags,

      sections: aiResponse.sections,
    };

    return res.status(200).json({
      success: true,
      message: "Course generated successfully",
      data: createdCourse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
