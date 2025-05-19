import React from 'react'
import { BrowserRouter,Link , Route,Routes } from 'react-router-dom'
import {logo} from './assets';
import { Home, Createpost } from './pages';
const App = () => {
  return (
   <BrowserRouter>
     <header className="w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b-[#e6ebf4]">
       <Link to="/">
         <img src={logo} alt="Shivam" className='w-23 object-contain' />
       </Link>
 <Link
   to="/create-post"
   className='font-inter create font-medium bg-[#6e92af] text-white px-4 py-2 hover:bg-[#273642]  rounded-full '
 
 >
   Create
 </Link>
     </header>

     <main className='sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]'>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/create-post" element={<Createpost />} />
       </Routes>
     </main>
   </BrowserRouter>
  )
}

export default App

