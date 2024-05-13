import "@splidejs/react-splide/css";
import { topPicks } from '../data/data';
import React, { useContext } from 'react';
import { cartContext } from '../Contexts/CartContext';
import { Splide, SplideSlide } from "@splidejs/react-splide";

const TopPicks = () => {

  const { addCart, removeCart } = useContext(cartContext);

  return (
    <>
      <h1 className='hidden pb-4 md:block lg:block text-2xl text-center text-orange-600 font-bold'>Top Picks</h1>
      <div className='hidden md:flex lg:flex max-w-[1520px] mx-3 m-auto p-4 py-5'>
        <Splide options={{ perPage: 4, gap: "6px", drag: 'free', arrows: false }}>
          {
            topPicks.map((item, index) => (
              <SplideSlide key={index}>
                <div className='relative rounded-3xl mx-3'>
                  <div className='absolute bg-black/60 w-full h-full rounded-3xl'>

                    <p className='p-4 pb-1 font-bold text-white text-xl'>{item.name}</p>
                    <p className='pl-4 text-white'>{item.price}</p>

                    <div className="flex flex-row mt-9">
                      <button onClick={() => addCart(item)} className='flex border border-dotted border-white rounded-2xl p-2 text-white text-[14px] ml-4'>Add to Cart</button>
                      <button onClick={() => removeCart(item)} className='flex border border-dotted border-white rounded-2xl p-2 text-white text-[14px] ml-4'>Remove</button>
                    </div>

                  </div>
                  <img
                    className='w-full h-[180px] object-cover rounded-3xl'
                    src={item.image}
                    alt={item.name} />
                </div>
              </SplideSlide>
            ))
          }
        </Splide>
      </div>
    </>
  );
}

export default TopPicks;