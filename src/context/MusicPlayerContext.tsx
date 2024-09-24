// MusicPlayerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Typ piosenki, możesz go dostosować do swojego interfejsu Song
interface Song {
  id: string;
  title: string;
  author: string;
  imgUrl: string;
}

// Typ dla naszego kontekstu
interface MusicPlayerContextType {
  currentSong: Song | null;
  playSong: (song: Song) => void;
}

// Tworzymy kontekst z domyślnymi wartościami
const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(
  undefined,
);

// Customowy hook do korzystania z kontekstu
export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};

// Provider, który owija całą aplikację i dostarcza stan
export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const playSong = (song: Song) => {
    setCurrentSong(song);
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, playSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
