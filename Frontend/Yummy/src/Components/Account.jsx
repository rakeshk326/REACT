import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsPerson, BsFillCartFill } from 'react-icons/bs';
import { TbTruckReturn } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import YummyLogo from '../Images/YummyLogo.png';
import SideNav from './SideNav';
import axios from 'axios';
import { cartContext } from '../Contexts/CartContext';

const Account = () => {

    const { userDetails } = useContext(cartContext);
    const [user,setUser] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    });
    const [sideNav, setSideNav] = useState(false);

  const handleClick = () => {
    setSideNav(!sideNav);
  };

  useEffect(() => {
    const fetchUserDetails = async() => {

      try {
        const response = await axios.get("http://localhost:8000/user/myAccount", {
          withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }

    }
    fetchUserDetails();
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mt-2 py-2 px-4">
      <div className="flex items-center">
            <div onClick={handleClick} className="cursor-pointer">
              <AiOutlineMenu className="text-2xl mb-1 font-bold sm:text-3xl md:text-3xl lg:text-4xl" />
            </div>
            <div>
              <img src={YummyLogo} alt="YummyLogo" className='w-[95px] lg:w-[110px]' style={{ color: 'fill-orange-700', paddingLeft: '8px' }} />
            </div>
          </div>
        <Link to="/editprofile"><button className="bg-orange-600 text-[12px] text-white flex items-center px-[9px] py-[7px] mx-1 rounded-md lg:px-3 lg:py-2 lg:mx-3 lg:text-[16px]" onClick={() => {}}>Edit Profile</button></Link>
      </div>

      <div className="flex flex-col items-center justify-center mx-4 mt-24">

        <div className="bg-white overflow-hidden shadow mx-4 rounded-lg border w-full sm:w-96 px-6 pt-6 pb-3 mt-4">
          <div className='border-b border-gray-200 pb-4'>
            <h4 className='text-base text-center font-medium text-gray-900 mb-2 lg:text-lg'>User Details</h4>
          </div>
          <dl className='divide-y divide-gray-200'>
            <div className='py-3'>
              <dt className='text-sm font-medium text-gray-500'>
                Full name
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {user.fullName}
              </dd>
            </div>
            <div className='py-3'>
              <dt className='text-sm font-medium text-gray-500'>
                Email address
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {user.email}
              </dd>
            </div>
            <div className='py-3'>
              <dt className='text-sm font-medium text-gray-500'>
                Phone number
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {user.phone}
              </dd>
            </div>
            <div className='py-3'>
              <dt className='text-sm font-medium text-gray-500'>
                Address
              </dt>
              <dd className='mt-1 text-sm text-gray-900'>
                {user.address}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <SideNav sideNav={sideNav} handleClick={handleClick} />
    </div>
  );
}

export default Account;