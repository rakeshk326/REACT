import React from 'react';

const Delivery = () => {

  return (

    <div className='px-4 pt-20 bg-white mt-8'>
        <h2 className='text-2xl text-center text-orange-600 font-bold'>Quick Delievery App</h2>
        <div className='mx-auto grid md:grid-cols-2'>
            <img
            className='w-[600px] my-4 mx-auto'
            src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1672676822/NetflixApp/FC_two_phones.6ec9a842f905769677f9_m91off.webp"
            alt="" />
            <div className='flex flex-col md:py-8 justify-center'>
                <p className='text-green-600 font-bold text-xl'>Get the App</p>
                <h1 className='text-xl font-bold mt-2 md:text-3xl lg:text-3xl'>Limitless Convenience on demand</h1>

                <p className='font-sans mt-4 md:hidden lg:hidden'>Yummy is a delightful restaurant offering a diverse menu of both tasty vegetarian and non-vegetarian delights. Enjoy the heavenly ambiance as we cater to a wide range of tastes. Our commitment to culinary excellence extends to our dedicated delivery service, bringing exceptional flavors to the comfort of your home. Download our app for a delightful dining adventure!</p>
                <p className=' hidden lg:block font-sans mt-4'>Yummy is a delightful restaurant renowned for its delectable array of both vegetarian and <br/> non-vegetarian culinary delights. Nestled in a cozy ambiance, the restaurant is a heaven for <br/> food enthusiasts seeking a diverse mouthwatering menu. From savory vegetarian delicacies <br/> to succulent non-vegetarian fare, we cater to a wide range of tastes, ensuring a very satisfying <br/> experience for all patrons. Beyond its inviting dining space, "Yummy" extends its commitment <br/> to culinary excellence through a dedicated delivery services application, ensuring that the same exceptional flavors can be savored in the comfort of your own home. With this much convenient <br/> option, we promise you a delightful dining adventure where every bite is a celebration of flavors !</p>
                <button className='bg-black text-green-500 font-semibold w-[120px] mt-5 rounded-md py-2'>Get Started</button>
            </div>
        </div>
    </div>
    
  )
}

export default Delivery;