import { BsSearch } from "react-icons/bs";
import { BiDownload } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <div className="flex h-screen bg-black text-white">
      <aside className="bg-gray-900 p-2 flex flex-col gap-1">
        <Link to={"./"}>
          <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
            <FaHome />
          </button>
        </Link>
        <Link to={"search"}>
          <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
            <BsSearch />
          </button>
        </Link>
        <Link to={"downloads"}>
          <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
            <BiDownload />
          </button>
        </Link>

        <Link to={"settings"}>
          <button className="text-left p-2 bg-gray-800 rounded hover:bg-gray-700">
            <FiSettings />
          </button>
        </Link>
      </aside>
      <Outlet />
    </div>
  );
};

export default Home;
