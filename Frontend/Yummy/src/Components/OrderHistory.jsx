import React, { useState, useContext } from 'react';
import { BsPerson } from 'react-icons/bs';
import { cartContext } from '../Contexts/CartContext';
import { AiOutlineMenu } from 'react-icons/ai';
import SideNav from './SideNav';
import YummyLogo from '../Images/YummyLogo.png';
import CartEmpty from '../Images/CartEmpty.png';

const OrderHistory = () => {
    const { confirmedItems, totalAmount } = useContext(cartContext);
    const [sideNav, setSideNav] = useState(false);

    const handleClick = () => {
        setSideNav(!sideNav);
    };

    return (
        <>
            <div className={`top-0 left-0 right-0 p-4`}>
                <div className="m-width-[1520] mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <div onClick={handleClick} className="cursor-pointer">
                            <AiOutlineMenu className="text-2xl mb-1 font-bold sm:text-3xl md:text-3xl lg:text-4xl" />
                        </div>
                        <div>
                            <img src={YummyLogo} alt="YummyLogo" className='w-[95px] lg:w-[110px]' style={{ color: 'fill-orange-700', paddingLeft: '8px' }} />
                        </div>
                    </div>

                    {/* <button className='bg-orange-600 text-[13px] text-white flex items-center px-[8px] py-[7px] mx-1 rounded-xl lg:px-3 lg:py-2 lg:mx-3 lg:text-[16px]'>
                        <BsPerson className='text-[13px] font-bold lg:text-[19px]' />
                        <span className='ml-1'></span>
                        {userDetails.fullName}
                    </button> */}
                </div>
            </div>

            {confirmedItems.length === 0 && (
                <div className='flex flex-col justify-center items-center h-screen'>
                <div>
                    <img
                    className='h-28 w-28'
                    src={CartEmpty}
                    alt="CartEmpty" />
                </div>
                <div className='text-center text-xl mt-2'>Your haven't ordered anything</div>
                </div>
            )}

            {confirmedItems.length > 0 && (
            <div>
            <h2 className='mx-6 md:mx-10 lg:mx-20 mt-5 text-xl md:text-2xl lg:text-3xl text-orange-600 font-bold pb-5'>Your Order is on the way !</h2>
            <div className="ml-8 md:ml-16 lg:ml-28 mt-2 md:mt-4 w-[300px] md:w-[500px] lg:w-[700px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>

                <div className='mx-1 mt-2 text-[13px] md:text-[14px] lg:text-[16px] font-semibold flex justify-between items-center' style={{ width: '98%' }}>
                    <div className='flex'>Order Placed </div>
                    <div className='flex'>Food Packed</div>
                    <div className='flex'>Order Delivered</div>
                </div>
            </div>
            </div>
            )}

            <div className='max-w-full mt-16 md:mt-20 mx-4 lg:mx-6'>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-6">
              {confirmedItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className='w-[100%] h-[125px] flex'>
                    <img
                      className='h-full w-full object-cover rounded-t-lg'
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className='p-3 md:p-4 lg:p-4'>
                      <strong className='block text-sm md:text-md lg:text-lg mb-2'>{item.name}</strong>

                      <div className='flex justify-between items-center mt-2'>
                          <div className='flex items-center'>
                              <span className='text-sm md:text-md lg:text-lg'>Quantity : {item.quantity}</span>
                          </div>

                          <div className='flex items-center'>
                              <span className='text-orange-600 text-sm md:text-md lg:text-[17px] font-bold'>Rs.{totalAmount(item)}</span>
                          </div>
                      </div>
                  </div>

                </div>

              ))}
            </div>
          </div>

            <SideNav sideNav={sideNav} handleClick={handleClick} />
        </>
    );
};

export default OrderHistory;
