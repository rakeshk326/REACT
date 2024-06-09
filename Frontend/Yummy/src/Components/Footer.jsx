import React from 'react';
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className='max-w-[1520px] m-auto py-3 px-2 text-white bg-[#24262b]'>

      <div className='flex justify-center items-center'>
        <p>Connect us</p>
      </div>

      <div className='flex flex-row justify-center items-center pt-3 pb-7'>
        
        <div className='px-2'>
          <AiOutlineFacebook size={30} className='cursor-pointer'/>
        </div>

        <div className='px-2'>
        < AiOutlineInstagram size={30} className='cursor-pointer'/>
        </div>

        <div className='px-2'>
          <AiOutlineTwitter size={30} className='cursor-pointer'/>
        </div>
      </div>
    </div>
  )
}

export default Footer;