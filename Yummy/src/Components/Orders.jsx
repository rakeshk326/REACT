import React, { useState, useEffect, useContext } from 'react';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import CartEmpty from '../Images/CartEmpty.png';
import { cartContext } from '../Contexts/CartContext';
import confetti from 'canvas-confetti';
import SideNav from './SideNav';
import YummyLogo from '../Images/YummyLogo.png';
import OrderPlaced from '../Images/OrderPlaced.png';

const Orders = () => {
  const { cartItems, totalAmount, confirmOrder,confirmedItems, addCart, removeCart, userDetails } = useContext(cartContext);
  const [overallTotal, setOverallTotal] = useState(0);
  const [apply, setApply] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [sideNav, setSideNav] = useState(false);

  const handleClick = () => {
    setSideNav(!sideNav);
  };

  const couponApply = () => {
    setApply(!apply);
  }

  const confirmOrdering = () => {
    confirmOrder();
    setConfirm(true);
  }

  const getQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    const calculateOverallTotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += totalAmount(item);
      });
      setOverallTotal(total);
    };

    calculateOverallTotal();
  }, [cartItems, totalAmount]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
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

          <button className='bg-orange-600 text-[14px] text-white flex items-center px-[9px] py-[7px] mx-1 rounded-xl lg:px-3 lg:py-2 lg:mx-3 lg:text-[16px]'>
            <BsPerson className='text-[15px] font-bold lg:text-[19px]' />
            <span className='ml-1'></span>
            {userDetails.fullName}
          </button>
        </div>
      </div>

      {cartItems.length === 0 && !confirm && (
        <div className='flex flex-col justify-center items-center mt-56'>
          <div>
            <img
              className='h-28 w-28'
              src={CartEmpty}
              alt="CartEmpty" />
          </div>
          <div className='text-center font-semibold text-xl mt-2'>Your cart is empty</div>
        </div>
      )}

      {confirm && (
        <div className='flex flex-col justify-center items-center mt-56'>
          <div>
            <img
              className='md:h-24 md:w-24 h-20 w-20'
              src={OrderPlaced}
              alt="OrderPlaced" />
          </div>
          <div className='text-center font-semibold text-xl mt-4'>Your order is placed</div>
        </div>
      )}

      {cartItems.length > 0 && !confirm && (
        <div className='flex flex-col md:flex-col lg:flex-row mt-6 lg:mt-2'>
          <div className='max-w-full mx-4 lg:w-[950px] lg:mx-6'>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className='w-[100%] h-[150px] flex'>
                    <img
                      className='h-full w-full object-cover rounded-t-lg'
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <div className='p-3 md:p-4 lg:p-4'>
                    <strong className='block text-sm md:text-md lg:text-lg mb-2'>{item.name}</strong>
                    <span className='block mb-2'>Price: {item.price}</span>

                    <div className='flex justify-between items-center mt-4'>
                      <div className='flex items-center'>
                        <button onClick={() => removeCart(item)} className='bg-orange-600 text-white p-2 pb-5 h-4 focus:outline-none rounded-l-full'>
                          <svg className='w-2.5 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 2'>
                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h16'/>
                          </svg>
                        </button>
                        <span className='mx-2'>{getQuantity(item.id)}</span>
                        <button onClick={() => addCart(item)} className='bg-orange-600 text-white p-2 pb-5 h-4 focus:outline-none rounded-r-full'>
                          <svg className='w-2.5 md:w-3 lg:w-3 h-2 md:h-3 lg:h-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 18 18'>
                            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 1v16M1 9h16'/>
                          </svg>
                        </button>
                      </div>

                      <div className='flex items-center'>
                        <span className='text-orange-600 text-[13px] lg:text-[16px] font-bold'>Rs.{totalAmount(item)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='block max-w-full lg:w-[520px] p-6 mb-6 md:mb-6 lg:mb-0 ml-4 md:ml-4 lg:ml-0 mr-4 md:mr-4 lg:mr-6 mt-6 md:mt-6 lg:mt-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' style={{ maxHeight: '590px', overflowY: 'auto' }}>
            <h5 className='mb-2 text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Order Summary</h5>

            <div className='mt-5'>
              <div className='flex justify-between'>
                <p className='mb-3 text-lg text-gray-700 dark:text-gray-400'>Payment :</p>
                <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>On delivery</p>
              </div>

              <div className='flex justify-between'>
                <p className='mb-3 text-lg text-gray-700 dark:text-gray-400'>Sub-Total :</p>
                <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>Rs. {(overallTotal).toFixed(1)}</p>
              </div>

              <div className='flex justify-between'>
                <p className='mb-3 text-lg text-gray-700 dark:text-gray-400'>GST (18%) :</p>
                <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>Rs. {(overallTotal * 0.18).toFixed(2)}</p>
              </div>

              <div className='flex justify-between'>
                <p className='mb-3 text-lg text-gray-700 dark:text-gray-400'>Delivery Fee :</p>
                {
                  apply ? (
                    <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400 line-through'>Rs. 100.0</p>
                  ) :
                  (
                    <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>Rs. 100.0</p>
                  )
                }
              </div>

              <div className='border-b border-gray-600 mt-1 mb-[10px]'></div>
              <div className='flex justify-between'>
                <p className='mb-3 text-lg text-gray-700 dark:text-gray-400'>Total :</p>
                {
                  apply ? (
                    <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>Rs. {((overallTotal) + (overallTotal*0.18)).toFixed(1)}</p>
                  ) : (
                    <p className='mb-3 mr-2 text-lg text-gray-700 dark:text-gray-400'>Rs. {((overallTotal) + 100 + (overallTotal*0.18)).toFixed(1)}</p>
                  )
                }
              </div>
              <div className='border-b border-gray-600 mb-[10px]'></div>
            </div>

            <div className='mt-4 text-center'>
              <button onClick={() => {triggerConfetti(); confirmOrdering()}} className='block text-center w-full px-1 py-2 overflow-hidden rounded bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 cursor-pointer'>
                CONFIRM AND PLACE ORDER
              </button>
            </div>

            <h4 className='mb-2 mt-6 text-xl md:text-2xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Coupons</h4>
            <h4 className='mb-2 mt-4 text-md font-bold tracking-tight text-gray-700 dark:text-white'>Active (1)</h4>
            <div className='mt-6'>
              <div className='flex'>
                <input type="text" id="coupons" className='w-[170px] md:w-[330px] lg:w-[200px] xl:w-[330px] flex bg-red-50 border border-orange-600 text-orange-700 placeholder-orange-600 text-sm rounded-lg focus:ring-orange-600 dark:bg-gray-700 focus:border-orange-600 p-2.5 dark:text-orange-600 dark:placeholder-orange-600 dark:border-orange-600' placeholder="YUMMY100" readOnly />
                <button type="button" onClick={() => couponApply()} className='rounded-lg text-sm px-5 py-3 me-2 ml-3 overflow-hidden bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 cursor-pointer'>{apply ? 'Applied' : 'Apply'}</button>
              </div>
              <p className='mt-4 ml-2 text-sm text-orange-600 dark:text-orange-500'>* Free delivery for first time order</p>
            </div>
          </div>
        </div>
      )}

     <SideNav sideNav={sideNav} handleClick={handleClick} />
    </>

  );
}

export default Orders;