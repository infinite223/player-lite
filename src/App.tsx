import { BiNews } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { ImInfo } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="flex bg-black text-white flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col flex-1 items-center justify-between">
        <header className="flex flex-col items-center text-center mt-4 gap-2">
          <h1 className="text-3xl font-extrabold">
            <span className="text-rose-800">Pl</span>ayer Lite
          </h1>
          <p>Simple and fast music playback application</p>
        </header>
        <a href={"/home"}>
          <button className="bg-rose-800 rounded-full px-5 py-3 font-bold">
            Wejdź do aplikacji
          </button>
        </a>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap text-sm font-thin items-center justify-center text-zinc-300">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImInfo size={20} />
          About Player-lite
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiNews size={20} />
          News
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiSettings size={20} />
          Settings
        </a>
      </footer>
    </div>
  );
}
