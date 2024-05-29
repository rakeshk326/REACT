import React, { useState, useContext } from 'react';
import { BsFillCartFill, BsPerson } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { TbTruckReturn } from 'react-icons/tb';
import { FaGoogleWallet } from 'react-icons/fa';
import { MdOutlineFavorite, MdHelp } from 'react-icons/md';
import YummyLogo from '../Images/YummyLogo.png';
import { cartContext } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';

const TopNav = () => {
  
  const { count } = useContext(cartContext);
  const [sideNav, setSideNav] = useState(false);

  const handleClick = () => {
    setSideNav(!sideNav);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 bg-white p-4 z-50`}>
      <div className="m-width-[1520] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div onClick={() => handleClick()} className="cursor-pointer">
            <AiOutlineMenu className="text-2xl mb-1 font-bold sm:text-3xl md:text-3xl lg:text-4xl" />
          </div>
          <div>
            <img src={YummyLogo} alt="YummyLogo" className='w-[100px] lg:w-[120px]' style={{ color: 'fill-orange-700', paddingLeft: '8px' }} />
          </div>
        </div>
        {/* <div className="hidden md:flex lg:flex bg-gray-300 rounded-3xl items-center px-2 w-[500px]">
          <AiOutlineSearch size={25} />
          <input
            className='bg-transparent p-2 w-full focus:outline-none'
            type="text"
            placeholder='Search meals'
          />
        </div> */}


        {count <= 0 ? (
            <div>
              <Link to="/orders">
              <button className='bg-orange-600 text-[14px] text-white flex items-center px-[9px] py-[7px] mx-1 rounded-xl lg:px-3 lg:py-2 lg:mx-3 lg:text-[18px]'>
                <BsFillCartFill className='text-[13px] lg:text-[19px]' />
                <span className='ml-1'></span>
                Cart
              </button>
              </Link>
            </div>
        ) : (
          <div className="relative inline-flex items-center">
            <Link to="/orders">
            <button className="bg-orange-600 text-[14px] text-white flex items-center px-[9px] py-[7px] mx-1 rounded-xl lg:px-3 lg:py-2 lg:mx-3 lg:text-[18px]">
              <BsFillCartFill className="text-[13px] lg:text-[19px]" />
              <span className="ml-1">Cart</span>
            </button>
            </Link>
            <div className="absolute top-[-10px] right-[2px] text-orange-600 bg-white border border-orange-600 rounded-full px-2 text-[14px] font-bold">
              {count}
            </div>
          </div>
        )}


          <SideNav sideNav={sideNav} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default TopNav;