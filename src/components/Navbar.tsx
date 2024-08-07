"use client";
import Image from "next/image";
import { assets } from "../../public/assets";
import Link from "next/link";

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
              <a href="#faq">FAQ</a>
            </li>

            <li>
              <a href="#demo">Demo</a>
            </li>
          </ul>
        </div>
        <Image
          src={assets.parsyllLogo}
          alt="Parsyll Logo"
          className="w-11 h-11"
        />
        <Link
          href="/"
          className="text-xl text-gray-800 font-semibold cursor-pointer"
        >
          Pdf2Cal
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex sm:flex ">
        <ul className="menu menu-horizontal px-10 flex space-x-7 ">
          <li>
            <a href="#faq">FAQ</a>
          </li>

          <li>
            <a href="#demo">Demo</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end ">
        <Link
            href="/Signin"
            className="btn px-7 rounded-full bg-[#0b7dffd4] from-[#0f55d6b8] to-[#91d9ff] text-white  hover:bg-[#6dc1fc]"
          >
            Sign in
          </Link>
        {/* {!session ? (
          <Link
            href="/Signin"
            className="btn px-7 rounded-full bg-[#0b7dffd4] from-[#0f55d6b8] to-[#91d9ff] text-white  hover:bg-[#6dc1fc]"
          >
            Sign in
          </Link>
        ) : (
          <div className="dropdown dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              className="bg-transparent cursor-pointer hover:scale-[1.06] transition-scale ease-in-out duration-300"
            >
              <div className="avatar">
                <div className="ring-[#0b7dffd4] ring-offset-base-100 hover:ring-[#6dc1fc] w-11 transition-colors ease-in-out duration-300 rounded-full ring ring-offset-[2px] ">
                  {/* change src, depending on the user pfp 
                  <Image
                    src={"/defaultpfp.png"}
                    alt={"User avatar"}
                    width={72}
                    height={72}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <button type="button">Sign out</button>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
