import { homeDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";

const Player = (): JSX.Element => {
  async function getFiles() {
    try {
      const homepath = await homeDir();
      const data = await readDir(homepath);
      console.log(data);
    } catch (error) {
      console.error("Failed to read directory:", error);
    }
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <main className="flex w-[200px] flex-col justify-between p-4">
        <div className="bg-gray-800 rounded-lg mb-4 p-4 flex items-center justify-center">
          <p className="text-gray-400">Wizualizacja fali dźwiękowej</p>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
            ⏮️
          </button>
          <button className="p-4 bg-rose-700 rounded-full hover:bg-rose-600">
            ▶️
          </button>
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
            ⏸️
          </button>
          <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
            ⏭️
          </button>
        </div>

        <button
          onClick={getFiles}
          className="mt-4 w-full px-4 py-2 bg-rose-800 rounded-full hover:bg-rose-700"
        >
          Pobierz pliki
        </button>
      </main>
    </div>
  );
};

export default Player;
