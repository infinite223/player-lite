import axios from "axios";

export const getYoutubeVideosData = async (param: string) => {
  try {
    const { data: data } = await axios.get(
      `https://youtube-v31.p.rapidapi.com/search`,
      {
        params: {
          q: param,
          part: "id,snippet",
          type: "video",
          maxResults: "20",
        },
        headers: {
          "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env["VITE_YOUTUBE_API_KEY"],
        },
      },
    );

    return data.items;
  } catch (error) {
    console.log(error);
  }
};
