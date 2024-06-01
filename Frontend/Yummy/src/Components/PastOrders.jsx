import React, { useState, useContext, useEffect } from 'react';
import { cartContext } from '../Contexts/CartContext';
import { AiOutlineMenu } from 'react-icons/ai';
import SideNav from './SideNav';
import YummyLogo from '../Images/YummyLogo.png';
import CartEmpty from '../Images/CartEmpty.png';
import axios from 'axios';

const PastOrders = () => {

    const { confirmedItems, totalAmount } = useContext(cartContext);
    const [sideNav, setSideNav] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
          try {
            const response = await axios.get("https://yummy-foods.onrender.com/order/pastorders", {
              withCredentials: true
            });
            setOrders(response.data);
          } catch (error) {
            console.error("Error fetching order details:", error);
          }
        };
        fetchOrderDetails();
      }, []);


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
                </div>
            </div>

            {orders.length === 0 && (
        <div className='flex flex-col justify-center items-center mt-56'>
          <div>
            <img
              className='h-28 w-28'
              src={CartEmpty}
              alt="CartEmpty" />
          </div>
          <div className='text-center font-semibold text-xl mt-2'>You haven't ordered anything</div>
        </div>
      )}


            <div className='max-w-full mb-6 mx-4'>
                {orders.length > 0 && <p className='mx-3 md:mx-4 lg:mx-5 my-3 text-[23px] lg:text-2xl text-orange-600 font-bold'>So far yo've ordered,</p>}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {orders.slice().reverse().map((order) => (
                <div key={order._id} className="bg-white max-w-full rounded-lg shadow-md overflow-hidden">
                    <div className='p-3 md:p-4 lg:p-4'>
                <div className='mb-2.5 ml-2'>
                    <strong className='text-md'>{order.date}</strong>
                </div>
                        
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mb-2">
                {order.foods.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className='w-[100%] h-[125px] flex'>
                    <img
                      className='h-full w-full object-cover rounded-t-lg'
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className='p-3 md:p-4 lg:p-4'>
                      <strong className='block text-md lg:text-lg mb-2'>{item.name}</strong>

                      <div className='flex justify-between items-center mt-2'>
                          <div className='flex items-center'>
                              <span className='text-[16px] md:text-md'>Quantity : {item.quantity}</span>
                          </div>

                          <div className='flex items-center'>
                              <span className='text-orange-600 text-sm md:text-md font-bold'>Rs.{item.totalPrice}</span>
                          </div>
                      </div>
                  </div>

                </div>
                ))}
                
                </div>
                </div>
                {/* <div className='flex mb-2.5 md:mb-3 ml-5 md:ml-7'>
                    <strong>Total : Rs.{order.total}</strong>
                </div> */}
                </div>
                ))}
                
            </div>
          </div>

            <SideNav sideNav={sideNav} handleClick={handleClick} />
        </>
    );
};

export default PastOrders;
