import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { useLocation ,Routes,Route} from 'react-router-dom'
import Footer from './Components/Footer'
import AllRooms from './Pages/AllRooms'
import Roomdetails from './Pages/Roomdetails'


function App() {
  
const IsOwner= useLocation().pathname.includes("owner")
  return (
  <div>
   {!IsOwner && < Navbar />} 
   <div className='min-h-[70vh]'>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rooms' element={<AllRooms/>} />
        <Route path='/rooms/:id' element={<Roomdetails/>} />
        
      </Routes>
   </div>
   <Footer/>
  </div>
  )
}

export default App
