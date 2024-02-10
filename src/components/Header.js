import Link from "next/link";
import React from "react";
import { ImStatsBars } from "react-icons/im";

const Header = () => {
  return (
    <header className=" text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <img
              src="/demo_user.jpeg"
              alt="User Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href={"/stats"}>
            <div className="flex items-center space-x-1">
              <ImStatsBars className="text-2xl" />{" "}
              <span className="text-sm font-medium">Stats</span>
            </div>
          </Link>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
