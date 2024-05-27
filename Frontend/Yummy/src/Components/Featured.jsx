import React from 'react';
import { useState, useEffect } from 'react';
import { RxDotFilled } from 'react-icons/rx';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Featured = () => {

    const array = [
        {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672076/NetflixApp/burger_emxbtv.jpg'
          },
          {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672452/NetflixApp/pizza_osjb4f.jpg'
          },
          {
            url: 'https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672612/NetflixApp/ric_a4ewxo.jpg',
          }
    ]

    const [index,setIndex] = useState(0);

    const prev = () => {
      const isFirst = index === 0;
      const newIndex = isFirst ? array.length-1 : index-1;
      setIndex(newIndex);
    }

    const next = () => {
      const isLast = index === array.length-1;
      const newIndex = isLast ? 0 : index+1;
      setIndex(newIndex);
    }

    const moveDots = (arrayIndex) => {
      setIndex(arrayIndex);
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        next();
      }, 2500);
    
      return () => clearInterval(intervalId);
    }, [index]);    

  return (
    <div className='max-w-[1520px] h-[500px] relative top-[70px] px-4 py-4 w-full group'>
        <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{backgroundImage: `url(${array[index].url})`}}>
        </div>
        <div className='hidden group-hover:block bg-orange-700 text-3xl text-white rounded-full absolute p-[5px] cursor-pointer top-[50%] translate-x-0 translate-y-[-50%] left-8'>
          <BsChevronCompactLeft onClick={() => prev()}/>
        </div>
        <div className='hidden group-hover:block bg-orange-700 text-3xl text-white rounded-full absolute p-[5px] cursor-pointer top-[50%] translate-x-4 translate-y-[-50%] right-12'>
          <BsChevronCompactRight onClick={() => next()}/>
        </div>
        <div className='flex justify-center p-4'>
          {
            array.map((arrayItems, arrayIndex) => (
              <div
              key={arrayIndex}
              className='text-2xl cursor-pointer'>
              <RxDotFilled onClick={() => moveDots(arrayIndex)}/>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Featured;