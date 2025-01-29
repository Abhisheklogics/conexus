import React from "react";
import { NavLink } from "react-router-dom";
import Pr1 from '../../../public/p_tiles/Anuvaad_eng .png'

export default function Project() {
  return (
    <>
      <div className="bg-gray-100 p-6 md:p-10 flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-6 md:gap-8">
        {/* Project 1 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 2 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 3 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 4 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 5 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 6 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 7 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>

        {/* Project 8 */}
        <div className="max-w-sm w-full md:w-[250px] h-fit bg-white border border-gray-200 rounded-lg shadow hover:shadow-2xl transition-shadow dark:bg-gray-800 dark:border-gray-700 relative">
          <img src={Pr1} className="w-full h-[250px] object-cover rounded-t-lg" />
          <div className="absolute bottom-4 left-4">
            <NavLink
              to="/p1"
              className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition"
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
