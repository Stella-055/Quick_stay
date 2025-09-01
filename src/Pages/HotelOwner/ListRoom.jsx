import React from 'react'
import { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../Components/Title';

const ListRoom = () => {
  const [rooms ,setRooms]=useState(roomsDummyData)
  return (
    <div>
      <Title align='left' font="outfit" title="Room Listings" subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum amet illum, voluptatibus ab est cumque hic corporis consectetur facere. Recusandae officiis ullam laborum sequi corporis quidem minus rerum in eum."/>
      <p className='text-gray-500 mt-8'>All Rooms</p>
      <div className=' mt-3 w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
           <table className='w-full'>
            <thead className='bg-gray-50'>
                <tr>
                    <th className='py-3 px-4 text-gray-800 font-medium'> Name</th>
                    <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                    <th className='py-3 px-4 text-gray-800 font-medium '>Price Per Night</th>
                    <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
                </tr>
            </thead>
            <tbody className='text-sm'>
                {rooms.map((item,index)=>(
                    <tr key={index}>
                        <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{item.roomType}</td>
                        <td className='py-3 px-4 text-gray-700 border-gray-300 max-sm:hidden border-t'>{item.amenities.join(",")}</td>
                        <td className='py-3 px-4 text-gray-700border-gray-300 text-center'>${item.pricePerNight}</td>
                          <td className='py-3 px-4  border-t border-gray-300 text-center text-sm text-red-500'>
                            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                              <input type="checkbox" className='sr-only peer' checked={item.isAvailable} />
                              <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                              <span className=' dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                            </label>
    
                          </td>
                    </tr>
                ))}
            </tbody>
           </table>
       </div>
    </div>
  )
}

export default ListRoom
