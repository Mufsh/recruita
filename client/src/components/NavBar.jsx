import icon from "../assets/icon.png";
const NavBar = ({ takeit }) => {
  return (
    <div>
      <nav className="bg-teal-600 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={icon} className="h-10" alt="Icon" />
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
              Recruita
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
