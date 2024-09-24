// Downloads.tsx
import { useEffect, useState } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import { SoundItem } from "../components/SoundItem";
import { useMusicPlayer } from "../context/MusicPlayerContext"; // Import kontekstu

interface Song {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}

const Downloads = (): JSX.Element => {
  const [songs, setSongs] = useState<Song[]>([]);
  const { playSong } = useMusicPlayer();

  const getSongs = async () => {
    try {
      const appLocalDirectory = await appLocalDataDir();
      const filePath = `${appLocalDirectory}/songs.json`;

      const existingData = await readTextFile(filePath);
      const songsList = JSON.parse(existingData);

      setSongs(songsList);
    } catch (error) {
      console.error("Failed to read JSON file:", error);
    }
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <div className="flex p-2 flex-col justify-between w-full overflow-auto bg-black text-white">
      <div className="flex flex-col">
        <h2>Pobrane utwory</h2>
        <div>
          {songs.length > 0 ? (
            songs.map((song, id) => (
              <div
                onClick={() => {
                  playSong(song);
                }}
                key={id}
              >
                <SoundItem {...song} />
              </div>
            ))
          ) : (
            <p>Brak pobranych utworów</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Downloads;
