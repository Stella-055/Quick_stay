import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { useLocation ,Routes,Route} from 'react-router-dom'


function App() {
  
const IsOwner= useLocation().pathname.includes("owner")
  return (
  <div>
   {!IsOwner && < Navbar />} 
   <div className='min-h-[70vh]'>
    <Routes>
        <Route path='/' element={<Home/>} />
        
      </Routes>
   </div>
  </div>
  )
}

export default App
