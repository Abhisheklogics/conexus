import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  

  return (
    <nav className="bg-gray-800 border-gray-200  dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4  ">
       

        <div className={`w-full md:block relative md:w-auto ${open ? "block" : "hidden"}`} id="navbar-multi-level  ml-40">
          <ul className=" text-lg  flex flex-col font-medium text-white p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/" className="ml-40 block py-1 px-3 text-white text-lg rounded md:bg-transparentmd:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">
                Home
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleToggleDropdown}
                class="flex items-center justify-between w-full px-2 py-0 hover:bg-gray-400 dark:hover:bg-gray-600 dark:hover:text-white px-1"
              >
             Automation
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>

              {dropdownOpen && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <NavLink to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                       CircuitSimulation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="https://website-theta-five-47.vercel.app/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Adhayanshala
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        Drones
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/paper" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
               Papers
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
