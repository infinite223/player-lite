import { useEffect, useState } from "react";
import { homeDir, resolve } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import "./index.css";

interface File {
  name: string;
  isDir: boolean;
}

const Item = ({
  handleClick,
  file,
}: {
  handleClick: (fileName: string) => void;
  file: File;
}): JSX.Element => (
  <div
    key={file.name}
    className={file.isDir ? "dir" : "file"}
    onClick={() => {
      if (!file.isDir) return;

      handleClick(file.name);
    }}
  >
    {file.isDir ? "📁" : "📄"}
    {file.name}
    {file.isDir ? "/" : ""}
  </div>
);

const Player = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    async function getHomeDir() {
      const homeDirPath = await homeDir();
      setCurrentPath(homeDirPath);
    }

    getHomeDir();
  }, []);

  useEffect(() => {
    async function getFiles() {
      const contents = await readDir(currentPath);

      const entries = [
        { name: ".", children: [] },
        { name: "..", children: [] },
        ...contents,
      ];

      const names = entries.map((entry) => ({
        name: entry.name || "",
        isDir: !!entry.children,
      }));

      setFiles(names);
    }
    getFiles();
  }, [currentPath]);

  async function getFiles() {
    const homepath = await homeDir();

    const data = await readDir(homepath);
    console.log(data);
  }

  return (
    <div className="files bg-black text-white h-screen items-center justify-center p-2">
      <a href={"../"}>{" < BACK "}</a>
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
