import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, handleSurpriseMe, surprise }) => {
  
 
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block text-sm font-medium text-gray-900'>{LabelName}</label>
        {surprise && <button type='button' onClick={handleSurpriseMe} className='font-semibold cursor-pointer text-xs bg-[#134f78] transition-all hover:bg-[#134f78] py-1 px-2 rounded-[30px]'>Surprise Me</button>}
      </div>
      <input type={type} id={name} placeholder={placeholder} value={value} onChange={handleChange} required className='bg-gray-50 placeholder:text-zinc-600 border-grey-300 text-gray-900 text-xs rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none border-1 block w-full border-gray-300 py-1 px-1 '/>
    </div>
  )
}

export default FormField
