import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import YummyLogo from '../Images/YummyLogo.png';
import axios from 'axios';

const Signup = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [register, setRegister] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    password: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (register) {
      navigate('/');
    }
  }, [register, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    localStorage.setItem('userData', JSON.stringify({ ...userData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      await axios.post("https://yummy-foods.onrender.com/user/signup", userData);
      setRegister(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Error signing up");
      }
    }
  };
  
  
  return (
    <div className="flex flex-col justify-center mt-48 items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 lg:h-16 w-auto"
          src={YummyLogo}
          alt="YummyLogo"
        />
        <h2 className="mt-3 md:mt-4 text-center text-[17px] md:text-[22px] font-bold leading-9 tracking-tight text-gray-900">
          Register with your details
        </h2>
      </div>

      <div className="mt-4 md:mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

        { error && 
        <div className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Alert ! </span> Email id already exists
        </div>
        }

        <form className="space-y-3 md:space-y-4.5" onSubmit={handleSubmit}>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={userData.fullName}
                onChange={handleInputChange}
                autoComplete="name"
                required
                className="block w-full rounded-md bg-white border border-gray-300 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleInputChange}
                autoComplete="password"
                required
                className="block w-full rounded-md bg-white border border-gray-300 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white border border-gray-300 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phone"
                type="tel"
                value={userData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                required
                className="block w-full rounded-md bg-white border border-gray-300 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={userData.address}
                onChange={handleInputChange}
                autoComplete="address"
                required
                className="block w-full rounded-md bg-white border border-gray-300 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md mt-4 bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;