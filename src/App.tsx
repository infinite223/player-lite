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
        <a href={"/player"}>
          <button className="bg-rose-800 rounded-full px-5 py-3 font-bold">
            Wejdź do aplikacji
          </button>
        </a>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap text-sm font-thin items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About Player-lite
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          News
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Settings
        </a>
      </footer>
    </div>
  );
}