import React from 'react';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1520px] m-auto py-3 px-2 text-white bg-[#24262b]'>

      <div className='flex justify-center items-center'>
        <p>Connect us</p>
      </div>

      <div className='flex flex-row justify-center items-center pt-3 pb-7'>
        
        <div className='px-2'>
          <FaFacebookSquare size={30} className='cursor-pointer'/>
        </div>

        <div className='px-2'>
        < FaInstagramSquare size={30} className='cursor-pointer'/>
        </div>

        <div className='px-2'>
          <FaTwitterSquare size={30} className='cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default Footer;