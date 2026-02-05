"use client"

import Link from "next/link";

const SideBar = () => {
    return (
      <>
        <div className="w-64 h-full bg-gray-800 text-white p-4.5">
          <h1 className="text-2xl font-bold mt-8">Catalogr</h1>
          <nav className="mt-10">
            <ul>
              <Link href="/">
                <li className="p-2 hover:bg-gray-700 rounded">All Books</li>
              </Link>
              <Link href="/">
                <li className="p-2 hover:bg-gray-700 rounded">Genres</li>
              </Link>
              <Link href="/">
                <li className="p-2 hover:bg-gray-700 rounded">Settings</li>
              </Link>
            </ul>
          </nav>
        </div>
      </>
    );
}
 
export default SideBar;