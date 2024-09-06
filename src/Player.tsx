import { homeDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import "./index.css";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const Player = (): JSX.Element => {
  const [files, setFiles] = useState<any[]>([]);

  async function getFiles() {
    try {
      const homepath = await homeDir();
      const data = await readDir(homepath);
      setFiles(data); // Ustawiamy pliki
      console.log(data);
    } catch (error) {
      console.error("Failed to read directory:", error);
    }
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <aside className="bg-gray-900 p-2 flex flex-col gap-1">
        <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
          <FaHome />
        </button>

        <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
          <BsSearch />
        </button>

        <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
          <BiDownload />
        </button>

        <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
          <FiSettings />
        </button>
      </aside>

      <main className="flex w-[200px] hidden flex-col justify-between p-4">
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

        {/* Wyświetlanie plików */}
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded">
              {file.name}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Player;
