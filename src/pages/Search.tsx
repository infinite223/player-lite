import { useEffect, useState } from "react";
import { getYoutubeVideosData } from "../services/youtubeClient";
import { YouTubeSearchResult } from "../utils/types";
import { SoundItem } from "../components/SoundItem";

const Search = (): JSX.Element => {
  const [searchText, setSearchText] = useState("");
  const [songs, setSongs] = useState<YouTubeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (searchText.length === 0) return;

      setLoading(true);
      const data: YouTubeSearchResult[] =
        await getYoutubeVideosData(searchText);

      if (data) {
        console.log("tutaj");
        setSongs(data);
      }
      setLoading(false);
    };

    getData();
  }, [searchText]);

  return (
    <div className="flex w-full flex-col h-screen bg-black p-2 text-white">
      <h2>Szukaj utworów</h2>
      <div className="my-2">
        <input
          value={searchText}
          onChange={(text) => setSearchText(text.target.value)}
          type="text"
          id="large-input"
          className="block w-full p-2 text-xs dark:ring-inherit text-gray-900 border outline-none rounded-sm border-gray-300 focus:ring-zinc-700 focus:border-zinc-700 dark:bg-zinc-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-zinc-600 dark:focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col w-full h-full gap-1 overflow-auto">
        {songs.map((song, id) => (
          <SoundItem
            key={id}
            author={song.snippet.channelTitle}
            title={song.snippet.title}
            imgUrl={song.snippet.thumbnails.default.url}
          />
        ))}
        {songs.length === 0 && !loading && searchText.length > 0 && (
          <span className="text-center text-pink-600 pt-2 text-sm font-mono">
            Nie znaleziono utworu..."
          </span>
        )}
        {loading && (
          <span className="flex w-full pt-2 text-sm font-mono animate-pulse items-center justify-center">
            Loading...
          </span>
        )}
      </div>
    </div>
  );
};

export default Search;
