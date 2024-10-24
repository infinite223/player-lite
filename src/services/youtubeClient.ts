export const getYoutubeVideosData = async (param: string) => {
  try {
    const client = await getClient();

    const response = await client.request({
      method: "GET",
      headers: {
        "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env["VITE_YOUTUBE_API_KEY"],
      },
      query: {
        q: param,
        part: "id,snippet",
        type: "video",
        maxResults: "20",
      },
      url: "https://youtube-v31.p.rapidapi.com/search",
    });

    const data: any = response?.data;

    return data.items;
  } catch (error) {
    console.log(error);
  }
};

import { writeBinaryFile } from "@tauri-apps/api/fs";
import { appLocalDataDir, appDataDir } from "@tauri-apps/api/path";

// Funkcja pobierająca plik i zapisująca go na dysk lokalny
export const getSongFile = async (idVideo: string) => {
  const appLocalDataDir_ = await appLocalDataDir();
  const appDataDir_ = await appDataDir();
  console.log(appLocalDataDir_, "appLocalDataDir");
  console.log(appDataDir_, "appDataDir_");

  try {
    const client = await getClient();

    const response = await client.request({
      method: "GET",
      headers: {
        "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        "x-rapidapi-key": import.meta.env["VITE_YOUTUBE_API_KEY"],
      },
      query: { id: idVideo },
      url: `https://youtube-mp36.p.rapidapi.com/dl`,
    });

    const data: any = response?.data;

    if (data.link) {
      const response = await fetch(data.link);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const binaryData = new Uint8Array(arrayBuffer);

      const appLocalDirectory = await appLocalDataDir();
      const filePath = `${appLocalDirectory}/${idVideo}.mp3`;

      await writeBinaryFile(filePath, binaryData);
    }
  } catch (error) {
    console.error("Błąd podczas pobierania i zapisywania pliku: ", error);
  }
};

import { writeFile, readTextFile } from "@tauri-apps/api/fs";
import { getClient } from "@tauri-apps/api/http";

export const updateSongsListJson = async (songData: {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}) => {
  try {
    const appLocalDirectory = await appLocalDataDir();
    const filePath = `${appLocalDirectory}/songs.json`;

    let songsList = [];

    try {
      const existingData = await readTextFile(filePath);
      songsList = JSON.parse(existingData);
    } catch (error) {
      console.log("Plik JSON nie istnieje, tworzenie nowego...");
    }

    songsList.push(songData);

    await writeFile({
      path: filePath,
      contents: JSON.stringify(songsList, null, 2),
    });

    console.log("Zaktualizowano listę utworów.");
  } catch (error) {
    console.error("Błąd przy aktualizacji pliku JSON:", error);
  }
};
