const axios = require("axios");
require("dotenv").config()

exports.extractPlaylistId = (
  playlistUrl
) => {
  try {
    const url =
      new URL(playlistUrl);

    return url.searchParams.get(
      "list"
    );
  } catch {
    return null;
  }
};

exports.getPlaylistVideos =
  async (playlistId) => {
    try {
      const response =
        await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: 50,
              playlistId,
              key:
                process.env
                  .YOUTUBE_API_KEY,
            },
          }
        );

      return response.data.items.map(
        (item) => ({
          title:
            item.snippet.title,

          description:
            item.snippet.description,

          thumbnail:
            item.snippet.thumbnails
              .high?.url,
        })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };