import { homeDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";
import { SoundItem } from "../components/SoundItem";
import { sounds } from "../utils/mocked-data";

const Downloads = (): JSX.Element => {
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
    <div className="flex p-2 flex-col h-screen w-full overflow-auto bg-black text-white">
      <h2>Pobrane utwory</h2>

      {sounds.map((sound, id) => (
        <SoundItem
          key={id}
          author="Jan Jowalczyk"
          title="Pokaż na co cie stać"
          imgUrl="https://picsum.photos/200/300"
        />
      ))}
    </div>
  );
};

export default Downloads;
