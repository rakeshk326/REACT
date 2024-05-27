import React from 'react';
import { categories } from '../data/data';

const Categories = () => {
  return (

    <div className='max-w-[1520px] m-auto px-4'>
        <h2 className='text-2xl text-center text-orange-600 font-bold pb-2'>Trending Categories</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 py-6 gap-5'>
            {
                categories.map((item) => (
                    <div key={item.id} className='py-2 flex justify-center items-center hover:scale-105 duration-200'>
                        <img
                        className='h-10 w-25 lg:h-14 object-cover cursor-pointer rounded-xl'
                        src={item.image}
                        alt={item.name} />
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default Categories;