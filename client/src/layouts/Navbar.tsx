import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
export default function Navbar() {
  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          {/* <img src={logo} alt="logo" className="w-28 object-contain" /> */}
          <h1 className="font-bold text-xl text-black">Ai image generator</h1>
        </Link>
        <Link
          to="/posts"
          className="font-inter font-medium bg-[#dafffc] text-zinc-900 px-4 py-2 rounded-md border-b"
        >
          Create
        </Link>
      </header>
      <Outlet />
    </>
  );
}
