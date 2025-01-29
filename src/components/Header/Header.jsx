import { NavLink } from "react-router-dom";


export default function Header() {

  

  

  return (
    <>
          <div className="md:w-full md:h-12 mt-[-60px]  md:mt-0 w-fit md:opacity-40 md:text-white md:bg-gray-500 ">
     
     </div>
     <ul className="absolute  ">
   
         <li className="md:mt-[-40px] md:ml-6 md:text-white md:font-bold md:font-serif text-white mt-1 ml-4 text-2xl">Conexus</li>
    
       </ul>
<div  style={{backgroundColor:'#222222'}} className=" flex gap-4 md:gap-6 bg-[#3E3E3E] p-2 rounded-lg md:h-[80px] md:p-0  w-fit  md:w-[640px] z-50   md:fixed  rounded-lg md:mt-[590px] md:left-[550px] md:block w-full flex justify-center items-center mt-16">

<ul style={{backgroundColor:'#3E3E3E'}} className=" overflow-x-scroll md:overflow-hidden md:w-[580px] gap-2 flex mt-10 p-2 md:flex md:h-[60px] md:left-10 md:mt-[2px] md:items-center md:gap-4 md:relative md:top-2 rounded-lg text-white     md:px-2">

 <button   style={{backgroundColor:'#23231E'}} className="  bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center md:ml-2 p-2 hover:border-2 hover:border-ston-200 border border-neutral-400 md:h-[50px]  md:justify-center md:flex md:p-2 md:w-20  md:rounded-lg md:items-center">
<NavLink to="/"   className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
Home

</NavLink >

 </button>

 <li  style={{backgroundColor:'#23231E'}} className="    p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg flex justify-center items-center md:h-[50px] md:bg-gray-600  md:hover:border-2 md:hover:border-ston-200 md:hover:border-2 md:hover:border-ston-200 md:border md:border-neutral-400 md:justify-center  md:w-20  md:pointer md:flex p-2  md:rounded-lg md:items-center">
 <NavLink to='/paper'    className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
 Papers
 </NavLink>

 </li>
 
 <li  style={{backgroundColor:'#23231E'}} className=" p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center md:h-[50px] md:bg-gray-600 md:hover:border-2 md:hover:border-ston-200 md:hover:border-2 md:hover:border-ston-200 md:border md:border-neutral-400 md:justify-center  md:pointer md:flex p-2  md:rounded-lg md:items-center">
<NavLink to='/room'    className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
 Automation
 </NavLink>
 </li>

 <NavLink to='/project'   className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
 <li  style={{backgroundColor:'#23231E'}} className=" p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center md:h-[50px] md:bg-gray-600 md:hover:border-2 md:hover:border-ston-200 md:hover:border-2 md:hover:border-ston-200 border md:border-neutral-400 md:w-20 md:justify-center  md:pointer md:flex p-2  md:rounded-lg md:items-center">

 
 Projects
 
 </li>
 </NavLink>
 <NavLink to='/about'   className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
 <li  style={{backgroundColor:'#23231E'}} className=" p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center  md:h-[50px] md:bg-gray-600 md:hover:border-2 md:hover:border-ston-200 md:hover:border-2 md:hover:border-ston-200 md:border md:border-neutral-400 md:w-20 md:justify-center  md:pointer md:flex p-2  md:rounded-lg md:items-center">

 
About
 
 </li>
 </NavLink>
 


 <NavLink to='/contact'   className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}>
 <li  style={{backgroundColor:'#23231E'}} className=" p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center md:h-[50px] md:bg-gray-600 md:hover:border-2 md:hover:border-ston-200 md:hover:border-2 md:hover:border-ston-200 md:border md:border-neutral-400 md:w-20 md:justify-center  md:pointer md:flex p-2  md:rounded-lg md:items-center">

 
 Contact
 
 </li>
 </NavLink>
 


</ul>
 </div>
 </>
      
  )
    }





/*import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="w-full h-20 bg-[#222222] fixed top-0 left-0 z-50">
        <ul className="absolute top-2 left-6 text-white text-2xl font-serif font-bold">
          <li>Conexus</li>
        </ul>

        <div className="w-full flex justify-center items-center mt-16 md:mt-0">
          <ul className="flex gap-4 md:gap-6 bg-[#3E3E3E] p-2 rounded-lg">
            <button className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
              >
                Home
              </NavLink>
            </button>

            <li className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
              <NavLink
                to="/paper"
                className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
              >
                Papers
              </NavLink>
            </li>

            <li className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
              <NavLink
                to="/automation"
                className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
              >
                Automation
              </NavLink>
            </li>

            <NavLink
              to="/project"
              className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
            >
              <li className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
                Projects
              </li>
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
            >
              <li className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
                About
              </li>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-red-500" : "text-white")}
            >
              <li className="p-2 bg-[#23231E] hover:border-2 hover:border-neutral-400 rounded-lg md:h-[50px] flex justify-center items-center">
                Contact
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  );
}
*/