import { Link } from "react-router-dom";
import { User, Sun, Moon, Menu, X } from "lucide-react";
import useModeStore from '../store/modeStore.js'
import { useState } from 'react'

const Navbar = () => {

  const { mode, setMode } = useModeStore()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-2 flex justify-between sm:justify-around items-center">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-600 to-amber-900 bg-clip-text text-transparent hover:from-amber-900 hover:via-amber-600 hover:to-amber-200">
        PERSONAL SPACE
      </Link>

      <ul className="hidden sm:flex space-x-8 text-lg">
        <li>
          <Link to="/diary" className="hover:text-gray-300 hover:underline">Diary</Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-gray-300 hover:underline">Blogs</Link>
        </li>
        <li>
          {mode === 'dark' ? <Sun className="w-6 h-6 hover:cursor-pointer hover:text-gray-300" onClick={() => setMode('light')} /> : <Moon className="w-6 h-6 hover:cursor-pointer hover:text-gray-300" onClick={() => setMode('dark')} />}
        </li>
        <li>
          <Link to="/profile" className="hover:text-gray-300">
            <User className="w-6 h-6" />
          </Link>
        </li>
      </ul>

      <div
        className="sm:hidden flex gap-3 items-center"
      >
        {mode === 'dark' ?
          <Sun className="w-6 h-6 hover:cursor-pointer hover:text-gray-300"
            onClick={() => setMode('light')}
          /> :
          <Moon className="w-6 h-6 hover:cursor-pointer hover:text-gray-300"
            onClick={() => setMode('dark')}
          />}

        {showMenu ?
          <X
            className="w-8 h-8"
            onClick={() => setShowMenu(false)}
          /> :
          <Menu
            className="w-8 h-8"
            onClick={() => setShowMenu(true)}
          />}

      </div>

      {showMenu && (
        <ul
          className="absolute top-16 left-0 w-full bg-gray-900 flex flex-col items-center space-y-4 py-4">
          <li>
            <Link to="/diary" className="hover:text-gray-300 hover:underline" onClick={() => setShowMenu(false)}>Diary</Link>
          </li>
          <li>
            <Link to="/blogs" className="hover:text-gray-300 hover:underline" onClick={() => setShowMenu(false)}>Blogs</Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-300" onClick={() => setShowMenu(false)}>
              <User className="w-6 h-6" />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
