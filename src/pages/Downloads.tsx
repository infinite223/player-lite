import { useEffect } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/api/fs";
import { SoundItem } from "../components/SoundItem";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const Downloads = (): JSX.Element => {
  const { playSong, setSongList, songList } = useMusicPlayer();

  const getSongs = async () => {
    try {
      const appLocalDirectory = await appLocalDataDir();
      const filePath = `${appLocalDirectory}/songs.json`;

      const existingData = await readTextFile(filePath);
      const _songsList = JSON.parse(existingData);
      if (songList.length !== _songsList.length) {
        setSongList(_songsList);
      }
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
          {songList.length > 0 ? (
            songList.map((song, id) => (
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
