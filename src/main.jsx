



import { StrictMode } from 'react'




import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import Home from './components/Home/Home.jsx'
import LobbyRoom from './components/Room/Loby.jsx'
import Room from './components/Room/Room.jsx'
 
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route  path='' element={<Home/>}/> 
      <Route path="room" element={<LobbyRoom/>} /> 
      <Route path="/room/:id" element={<Room />} />
    

    
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
