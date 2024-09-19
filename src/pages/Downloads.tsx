import { useEffect, useState } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import { SoundItem } from "../components/SoundItem";
import { SoundPlayer } from "../components/SoundPlayer";
interface Song {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}
const Downloads = (): JSX.Element => {
  const [songs, setSongs] = useState<Song[]>([]);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
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
    <div className="flex p-2 flex-col justify-between h-screen w-full overflow-auto bg-black text-white">
      <div className="flex flex-col">
        <h2>Pobrane utwory</h2>
        <div>
          {songs.length > 0 ? (
            songs.map((song, id) => (
              <div onClick={() => setSelectedSong(song)}>
                <SoundItem {...song} key={id} />
              </div>
            ))
          ) : (
            <p>Brak pobranych utworów</p>
          )}
        </div>
      </div>

      {selectedSong && <SoundPlayer {...selectedSong} />}
    </div>
  );
};

export default Downloads;
