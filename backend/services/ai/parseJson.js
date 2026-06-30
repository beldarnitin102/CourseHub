// Replace the entire contents of your C:\Users\Admin\OneDrive\Desktop\mega backend\backend\services\ai\parseJson.js file with this:

exports.parseAIJSON = (text) => {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("No text content received from AI");
    }

    let cleanText = text.trim();

    // Remove markdown code blocks if the AI somehow included them
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    }

    cleanText = cleanText.trim();

    // Parse and return the valid JavaScript object
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("=== JSON PARSING FAILED ===");
    console.error("Raw Text Attempted to Parse:", text);
    console.error("Parsing Error details:", error.message);
    throw new Error("AI returned invalid JSON");
  }
};
