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

// export const getSongFile = async (idVideo: string) => {
//   try {
//     const { data: data } = await axios.get(
//       `https://youtube-mp36.p.rapidapi.com/dl`,
//       {
//         params: { id: idVideo },
//         headers: {
//           "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
//           "x-rapidapi-key": import.meta.env["VITE_YOUTUBE_API_KEY"],
//         },
//       },
//     );
//     console.log(data, "data");
//     // window.location.href = data.link;
//   } catch (error) {
//     console.log(error);
//   }
// };

import { writeBinaryFile } from "@tauri-apps/api/fs";
import { appLocalDataDir, appDataDir } from "@tauri-apps/api/path";

// Funkcja pobierająca plik i zapisująca go na dysk lokalny
export const getSongFile = async (idVideo: string) => {
  const appLocalDataDir_ = await appLocalDataDir();
  const appDataDir_ = await appDataDir();
  console.log(appLocalDataDir_, "appLocalDataDir");
  console.log(appDataDir_, "appDataDir_");

  try {
    const { data: data } = await axios.get(
      `https://youtube-mp36.p.rapidapi.com/dl`,
      {
        params: { id: idVideo },
        headers: {
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env["VITE_YOUTUBE_API_KEY"],
        },
      },
    );

    if (data.link) {
      // Pobierz plik audio przy użyciu fetch
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
