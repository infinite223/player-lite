import { BsSearch } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { SoundPlayer } from "../components/SoundPlayer";
import { useMusicPlayer } from "../context/MusicPlayerContext";

const Home = (): JSX.Element => {
  const { currentSong } = useMusicPlayer();

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-black text-white">
      <div className="flex w-full">
        <aside className="bg-zinc-950 p-2 flex flex-col gap-1">
          <Link to={"./"}>
            <button className="text-left p-2 bg-zinc-800 rounded hover:bg-zinc-700">
              <FaHome />
            </button>
          </Link>
          <Link to={"search"}>
            <button className="text-left p-2 bg-zinc-800 rounded hover:bg-zinc-700">
              <BsSearch />
            </button>
          </Link>
          <Link to={"downloads"}>
            <button className="text-left p-2 bg-zinc-800 rounded hover:bg-zinc-700">
              <BiDownload />
            </button>
          </Link>

          <Link to={"settings"}>
            <button className="text-left p-2 bg-zinc-800 rounded hover:bg-zinc-700">
              <FiSettings />
            </button>
          </Link>
        </aside>
        <Outlet />
      </div>
      <div className="flex w-full justify-between mt-auto">
        {currentSong && <SoundPlayer {...currentSong} />}
      </div>
    </div>
  );
};

export default Home;
