import { useRef, useEffect, useState } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { BiPause, BiPlay, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { useMusicPlayer } from "../context/MusicPlayerContext";

export const SoundPlayer = () => {
  const {
    currentSong,
    isPlaying,
    playNextSong,
    playPreviousSong,
    togglePlayPause,
  } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundPath, setSoundPath] = useState<string>("");

  useEffect(() => {
    const loadAndPlayAudio = async () => {
      if (audioRef.current && currentSong) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        const path = await appLocalDataDir();
        const filePath = await join(path, `${currentSong.id}.mp3`);
        const musicUrl = convertFileSrc(filePath);
        setSoundPath(musicUrl);

        audioRef.current.load();

        if (isPlaying) {
          setTimeout(() => {
            audioRef.current
              ?.play()
              .then(() => {})
              .catch((error) => {
                console.error("Błąd odtwarzania audio:", error);
              });
          }, 100);
        }
      }
    };

    loadAndPlayAudio();
  }, [currentSong, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      togglePlayPause();
    }
  };

  const handleEnded = () => {
    playNextSong();
  };

  return currentSong ? (
    <div className="flex items-center gap-2 w-full mb-2 h-100 justify-between bg-black opacity-90 px-3 py-1">
      <div className="max-w-[250px]">
        <p className="text-sm leading-4 line-clamp-2">{currentSong.title}</p>
        <p className="text-xs font-mono">{currentSong.author}</p>
        <audio ref={audioRef} src={soundPath} onEnded={handleEnded} />
        <div className="flex items-center gap-2">
          <button onClick={playPreviousSong}>
            <BiSkipPrevious size={25} />
          </button>
          <button onClick={handlePlayPause}>
            {!isPlaying ? <BiPlay size={25} /> : <BiPause size={25} />}
          </button>
          <button onClick={playNextSong}>
            <BiSkipNext size={25} />
          </button>
        </div>
      </div>
      <img
        src={currentSong.imgUrl}
        alt={currentSong.title}
        className={`w-16 h-16 rounded-full border-2`}
        style={isPlaying ? { animation: "spin 3s linear infinite" } : {}}
      />
    </div>
  ) : null;
};
