import { appLocalDataDir } from "@tauri-apps/api/path";
import { useState, useRef, useEffect } from "react";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { BiPause, BiPlay } from "react-icons/bi";

interface SoundPlayerProps {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}

export const SoundPlayer = ({
  id,
  title,
  author,
  imgUrl,
}: SoundPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundPath, setSoundPath] = useState<string>("");

  useEffect(() => {
    const loadAndPlayAudio = async () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(false);

      const path = await appLocalDataDir();
      const filePath = await join(path, `${id}.mp3`);
      const musicUrl = convertFileSrc(filePath);
      setSoundPath(musicUrl);

      if (audioRef.current) {
        audioRef.current.load();

        setTimeout(() => {
          audioRef.current
            ?.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Błąd odtwarzania audio:", error);
            });
        }, 100);
      }
    };

    loadAndPlayAudio();
  }, [id]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-2 w-full mb-2 h-100 justify-between bg-black opacity-90 px-3 py-1">
      <div className="max-w-[160px]">
        <p className="text-sm leading-4 line-clamp-2">{title}</p>
        <p className="text-xs font-mono">{author}</p>
      </div>
      <img
        src={imgUrl}
        alt={title}
        className={`w-16 h-16 rounded-full border-2`}
        style={isPlaying ? { animation: "spin 3s linear infinite" } : {}}
      />
      <audio ref={audioRef} src={soundPath} />
      <button onClick={handlePlayPause}>
        {!isPlaying ? <BiPlay size={25} /> : <BiPause size={25} />}
      </button>
    </div>
  );
};
