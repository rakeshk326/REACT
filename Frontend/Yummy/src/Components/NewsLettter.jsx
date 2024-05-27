import React from 'react';

const NewsLettter = () => {
  return (
    <div className='max-w-[1520px] m-auto py-3 px-2 text-white bg-[#24262b]'>
      <div className='grid m-auto md:grid-cols-2 lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4 pl-4'>
          <p>Need advice on how to improve your flow?</p>
          <p>Sign up and join to stay up to date with us</p>
        </div>

        <div className='my-4 flex px-4 '>
          <div>
            <div className='flex flex-row justify-between items-center'>
              <input
                className='flex text-black rounded-md p-3 w-full focus:outline-[#00df9a]'
                type="email"
                placeholder='Email Id'
              />

              <button className='rounded-md text-center w-[200px] ml-4 px-2 py-3 bg-[#00df9a] text-white'>
                Notify me
              </button>
            </div>

            <div className='mt-4 lg:mt-3'>
              <p>We are concerned about your data security. Read{" "} <span className='text-[#00df9a] cursor-pointer'>Privacy Policy</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLettter;