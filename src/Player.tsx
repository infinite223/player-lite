import { homeDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import "./index.css";
import { TopNavigation } from "./components/TopNavigation";

const Player = (): JSX.Element => {
  async function getFiles() {
    const homepath = await homeDir();

    const data = await readDir(homepath);
    console.log(data);
  }

  return (
    <div className="files bg-black text-white h-screen items-center justify-center p-2">
      <TopNavigation backAction={true} title="Player" />
      <button
        onClick={getFiles}
        className="px-2 py-1 mt-2 bg-rose-800 rounded-full w-full"
      >
        Get files
      </button>
    </div>
  );
};
export default Player;
