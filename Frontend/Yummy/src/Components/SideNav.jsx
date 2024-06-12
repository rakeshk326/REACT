import React from 'react';
import { AiOutlineClose, AiOutlineHistory } from 'react-icons/ai';
import { BsPerson, BsFillCartFill } from 'react-icons/bs';
import { BiFoodMenu } from "react-icons/bi";
import { TbTruckReturn, TbLogout2 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import YummyLogo from '../Images/YummyLogo.png';

const SideNav = ({ sideNav, handleClick }) => {
  return (
    <>
      {sideNav ? (
          <div className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0' onClick={() => handleClick()}></div>
        ) : ("")}
        <div className={`bg-white fixed w-[300px] h-screen top-0 ${sideNav ? 'left-0' : 'left-[-100%]'} z-10 duration-300`}>
          <AiOutlineClose size={25} onClick={() => handleClick()} className='absolute top-6 right-4' />
          <div>
            <img
              className='p-4 w-[130px] lg:w-[150px]'
              src={YummyLogo}
              alt="YummyLogo"
            />
          </div>
          <nav>
          <ul className='flex flex-col p-6 text-gray-900'>

            <Link to="/myaccount">
            <li className='text-xl font-semibold py-4 flex'>
                <BsPerson className='text-white bg-gray-900 rounded-full font-extrabold px-1 mt-1 mr-4' size={25}/>
                My Account
            </li>
            </Link>

            <Link to="/main">
            <li className='text-xl font-semibold py-4 flex'>
                <BiFoodMenu className='text-white bg-gray-900 rounded-full font-extrabold px-1 mr-4' size={25}/>
                Main Menu
              </li>
            </Link>

            <Link to="/pastorders">
              <li className='text-xl font-semibold py-4 flex'>
                <AiOutlineHistory className='text-white bg-gray-900 rounded-full font-extrabold px-1 mr-4' size={25}/>
                My Orders
              </li>
            </Link>

              <Link to="/orders">
              <li className='text-xl font-semibold py-4 flex'>
                <BsFillCartFill className='text-white bg-gray-900 rounded-full font-extrabold px-1 mr-4' size={25}/>
                My Cart
              </li>
              </Link>

              <Link to="/delivery">
              <li className='text-xl font-semibold py-4 flex'>
                <TbTruckReturn className='text-white bg-gray-900 rounded-full font-extrabold px-1 mr-4' size={25}/>
                Delivery
              </li>
              </Link>

              <Link to="/">
              <button onClick={() => { Cookies.remove('token') }} className='text-xl font-semibold py-4 flex'>
                <TbLogout2 className='text-white bg-gray-900 rounded-full font-extrabold px-1 mr-4' size={25}/>
                Log out
              </button>
              </Link>

          </ul>
          </nav>
        </div>
    </>
  );
}

export default SideNav;