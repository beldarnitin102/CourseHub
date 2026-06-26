const axios = require("axios");
require("dotenv").config();

exports.extractPlaylistId = (playlistUrl) => {
  try {
    const url = new URL(playlistUrl);
    return url.searchParams.get("list");
  } catch {
    return null;
  }
};

const parseDuration = (iso8601) => {
  if (!iso8601) return "0:00";

  const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const mm = String(minutes).padStart(hours > 0 ? 2 : 1, "0");
  const ss = String(seconds).padStart(2, "0");

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
};

const fetchVideoDurations = async (videoIds) => {
  const durationMap = new Map();

  // YouTube Videos API allows up to 50 IDs per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "contentDetails",
          id: batch.join(","),
          key: process.env.YOUTUBE_API_KEY,
        },
      },
    );

    for (const item of response.data.items || []) {
      durationMap.set(item.id, parseDuration(item.contentDetails?.duration));
    }
  }

  return durationMap;
};

exports.getPlaylistVideos = async (playlistId) => {
  try {
    const allVideos = [];
    let nextPageToken = null;

    // ── Step 1: Collect all playlist items ─────────────────────────
    do {
      const params = {
        part: "snippet",
        maxResults: 50,
        playlistId,
        key: process.env.YOUTUBE_API_KEY,
      };

      if (nextPageToken) {
        params.pageToken = nextPageToken;
      }

      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        { params },
      );

      const items = response.data.items || [];

      const videos = items
        // Skip private/deleted videos that have no usable videoId
        .filter(
          (item) =>
            item.snippet.title !== "Deleted video" &&
            item.snippet.title !== "Private video" &&
            item.snippet.resourceId?.videoId,
        )
        .map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail:
            item.snippet.thumbnails?.maxres?.url ||
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            item.snippet.thumbnails?.default?.url ||
            "",
          videoId: item.snippet.resourceId.videoId,
          videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          position: item.snippet.position,
          duration: "0:00", // placeholder until Step 2 fills it in
        }));

      allVideos.push(...videos);
      nextPageToken = response.data.nextPageToken || null;
    } while (nextPageToken);

    // Sort by position to maintain playlist order
    allVideos.sort((a, b) => a.position - b.position);

    // ── Step 2: Fetch real durations for all collected videoIds ─────
    const videoIds = allVideos.map((v) => v.videoId);
    const durationMap = await fetchVideoDurations(videoIds);

    // Attach duration to each video object
    for (const video of allVideos) {
      video.duration = durationMap.get(video.videoId) || "0:00";
    }

    return allVideos;
  } catch (error) {
    console.error(
      "[youtubeService] Error fetching playlist videos:",
      error?.response?.data || error.message,
    );
    throw error;
  }
};
