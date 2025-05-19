import React from 'react'

const Card = ({data}) => {
  return (
   <div className='w-full h-full mb-3  relative  cursor-pointer'>
  <img src={data.photo} className='w-full hover:opacity-[0.4]   peer' alt="" />
  <div className='w-full h-full absolute top-0 flex flex-col flex-wrap  peer-hover:bg-[#000000d4] peer-hover:rounded-xl peer-hover:opacity-[1] opacity-0 pointer-events-none p-3'>
    <h1 className='text-[#ffff] text-2xl uppercase font-bold'>Developed by <span className='text-[#2346e2] '>{data.name}</span></h1>
    <p className='text-xs ml-3 line-clamp-10 leading-4 mt-2 text-[#fafafd]'>{data.prompt}</p>
  </div>
</div>
  )
}

export default Card
