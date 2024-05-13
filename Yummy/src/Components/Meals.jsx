import { mealData } from '../data/data';
import React, { useState, useContext } from 'react';
import { cartContext } from '../Contexts/CartContext';

const Meals = () => {

    const { addCart, removeCart, cartItems } = useContext(cartContext);
    const [foods,setFoods] = useState(mealData);

    const filterFoods = (category) => {
        setFoods(
            mealData.filter((item) => {
                return item.category === category;
            }
        ));
    }

    const getQuantity = (itemId) => {
        const cartItem = cartItems.find((item) => item.id === itemId);
        return cartItem ? cartItem.quantity : 0;
    }

  return (
    <div className='max-w-[1520px] m-auto px-4 pt-8 pb-12'>
        <h2 className='text-2xl text-center text-orange-600 font-bold pb-5'>Our Meals</h2>
        <div className='flex justify-center items-center pb-6'>

            <button
            onClick={() => setFoods(mealData)}
            className='bg-orange-600 text-white m-1 rounded-[12px] px-3 py-[6px] border border-white hover:bg-white hover:text-orange-600 hover:border-orange-600'>
            All
            </button>

            <button
            onClick={() => filterFoods("pizza")}
            className='bg-orange-600 text-white m-1 rounded-[12px] px-3 py-[6px] border border-white hover:bg-white hover:text-orange-600 hover:border-orange-600'>
            Pizza
            </button>

            <button
            onClick={() => filterFoods("chicken")}
            className='bg-orange-600 text-white m-1 rounded-[12px] px-3 py-[6px] border border-white hover:bg-white hover:text-orange-600 hover:border-orange-600'>
            Chicken
            </button>
            
            <button
            onClick={() => filterFoods("salad")}
            className='bg-orange-600 text-white m-1 rounded-[12px] px-3 py-[6px] border border-white hover:bg-white hover:text-orange-600 hover:border-orange-600'>
            Salad
            
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                foods.map((item) => (

                    <div key={item.id} className='border-none py-1 lg:py-2s'>
                        <img
                        className='w-full h-[170px] object-cover rounded-2xl'
                        src={item.image}
                        alt={item.name} />

                        <div className=' flex justify-between items-center px-4 py-2'>
                            <p className='font-bold'>{item.name}</p>
                            <p className='bg-orange-600 text-white text-center rounded-full h-14 w-14 px-1 pt-[10px] font-bold -mt-14 border-4 border-white'>{item.price}</p>
                        </div>

                        <div className='pl-4 flex'>

                        <div className='relative'>
                        <button
                            onClick={() => addCart(item)}
                            className='bg-orange-600 text-[10px] text-white flex items-center border border-orange-600 rounded-xl px-3 py-2 mr-2 mt-1 lg:px-3 lg:py-2'>
                            Add to cart
                        </button>
                        {getQuantity(item.id) > 0 && (
                            <div className='absolute top-[-3px] right-[5px] text-orange-600 bg-white border border-orange-600 rounded-full px-2 text-[10px] font-bold'>
                            {getQuantity(item.id)}
                            </div>
                        )}
                        </div>


                            <button
                            onClick={() => removeCart(item)}
                            className='text-orange-600 text-[10px] bg-white flex items-center border border-orange-600 rounded-xl px-3 py-2 mr-2 mt-1 lg:px-3 lg:py-2'>
                            Remove
                            </button>
                            
                         </div>

                    </div>
                    
                ))
            }
        </div>
    </div>
  )
}

export default Meals;