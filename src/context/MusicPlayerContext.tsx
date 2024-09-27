import { createContext, useContext, useState, ReactNode } from "react";

interface Song {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  togglePlayPause: () => void;
  setSongList: (songs: Song[]) => void;
  songList: Song[];
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined,
);

export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [songList, setSongList] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Nowy stan dla odtwarzania muzyki

  const playSong = (song: Song) => {
    const songIndex = songList.findIndex((s) => s.id === song.id);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
    }
  };

  const playNextSong = () => {
    if (currentSongIndex !== null && songList.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songList.length;
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex !== null && songList.length > 0) {
      const prevIndex =
        (currentSongIndex - 1 + songList.length) % songList.length;
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong:
          currentSongIndex !== null ? songList[currentSongIndex] : null,
        isPlaying,
        playSong,
        playNextSong,
        playPreviousSong,
        togglePlayPause,
        setSongList,
        songList,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
