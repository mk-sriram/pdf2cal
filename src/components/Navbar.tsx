import Image from "next/image";
import { assets } from "../../public/assets";
const Navbar = () => {
  return (
    <div className="container mx-auto flex justify-center navbar bg-inherit py-[29px] w-[70%]">
      <div className="navbar-start space-x-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 h-20 p-2 shadow justify-normal"
          >
            <li>
              <a>FAQ</a>
            </li>

            <li>
              <a>Demo</a>
            </li>
          </ul>
        </div>
        <Image
          src={assets.parsyllLogo}
          alt="Parsyll Logo"
          className="w-11 h-11"
        />
        <a className="text-xl font-semibold cursor-pointer">Parsyll</a>
      </div>
      <div className="navbar-center hidden lg:flex sm:flex ">
        <ul className="menu menu-horizontal px-10 flex space-x-7 ">
          <li>
            <a>FAQ</a>
          </li>

          <li>
            <a>Demo</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end ">
        <a className="btn px-7 rounded-full bg-[#0b99ffd4] from-[#0f55d6b8] to-[#91d9ff] text-white  hover:bg-[#6dc1fc]">
          Login
        </a>
      </div>
    </div>
  );
};

export default Navbar;
