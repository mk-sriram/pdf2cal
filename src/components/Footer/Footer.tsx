import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/parsyllLogo.png"
              alt="Parsyll Logo"
              width={44}
              height={44}
            />
            <span className="self-center  whitespace-nowrap text-xl text-gray-800 font-semibold">
              PDF2Cal
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0">
            <li>
              <a
                href="#"
                className="transition-all transform active:scale-[0.98] hover:scale-[1.05] me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="transition-all transform active:scale-[0.98] hover:scale-[1.5] me-4 md:me-6 duration-100"
              >
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="#"
                className="transition-all transform active:scale-[0.98] hover:scale-[1.01]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024{" "}
          <a
            href="/"
            className="transition-all transform active:scale-[0.98] hover:scale-[1.01]"
          >
            PDF2CAL
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
