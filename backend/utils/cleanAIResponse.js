exports.cleanJSON = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found");
    }

    return JSON.parse(match[0]);
  } catch (err) {
    throw new Error("Failed to parse AI JSON");
  }
};