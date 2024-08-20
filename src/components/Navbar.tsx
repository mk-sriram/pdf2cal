"use client";
import Image from "next/image";
import { assets } from "../../public/assets";
import Link from "next/link";
import useAuth from "@/utils/supabase/useAuth";
import React from "react";
const Navbar = () => {
  const { user, loading, handleSignOut } = useAuth();
  const [isMobile, setIsMobile] = React.useState(false);
  //console.log(user);
  //console.log( data.session?.user?.user_metadata )
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 470);
    };

    handleResize(); // Set the initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="container mx-auto flex justify-center navbar bg-inherit py-[29px] w-[70%]">
      <div className="navbar-start space-x-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow justify-normal"
          >
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#demo">Demo</a>
            </li>
            {!user && isMobile && (
              <li>
                <Link
                  href="/Signin"
                  className=" w-[70%] px-4 rounded-full bg-[#0b7dffd4] text-white hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01]"
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Image
          src="/parsylllogotrans.png"
          alt="Parsyll Logo"
          width={44}
          height={44}
        />
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default navigation
            window.location.href = "/"; // Force a full page reload
          }}
          className="text-xl text-gray-800 font-semibold cursor-pointer"
        >
          PDF2Cal
        </Link>
      </div>
      <div className="navbar-center hidden  md:flex ">
        <ul className="menu menu-horizontal px-10 flex space-x-7 ">
          <li>
            <a href="#faq">FAQ</a>
          </li>

          <li>
            <a href="#demo">Demo</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {!user && !isMobile && (
          <Link
            href="/Signin"
            className="btn px-7 rounded-full bg-[#0b7dffd4] text-white  hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01]"
          >
            Sign in
          </Link>
        )}
        {user && (
          <div className="dropdown dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              className="bg-transparent cursor-pointer hover:scale-[1.06] transition-scale ease-in-out duration-300 "
            >
              <div className="avatar">
                <div className="ring-[#0b7dffd4] ring-offset-base-100 hover:ring-[#6dc1fc] w-11 transition-colors ease-in-out duration-300 rounded-full ring ring-offset-[2px] ">
                  {/* change src, depending on the user pfp */}
                  <Image
                    src={user?.user_metadata.avatar_url ?? "/defaultpfp.png"}
                    alt={user?.user_metadata.name ?? "User avatar"}
                    width={71}
                    height={71}
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
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
