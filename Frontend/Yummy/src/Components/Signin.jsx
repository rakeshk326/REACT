import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import YummyLogo from '../Images/YummyLogo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
 
  try {
    const response = await axios.post("https://yummy-foods.onrender.com/user/signin", userData, { withCredentials: true });
    localStorage.setItem('token', response.data.token, { HttpOnly: true });
    console.log(document.cookie);
    
    if (response.status == 200) {
      navigate('/main');
    } 

  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Error logging in");
    }
  }
};
  
  return (
    <div className="flex flex-col justify-center mt-32 items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-12 lg:h-16 w-auto"
          src={YummyLogo}
          alt="YummyLogo"
        />
        <h2 className="mt-3 md:mt-4 text-center text-[17px] md:text-[22px] font-bold leading-9 tracking-tight text-gray-900">
          Login with your details
        </h2>
      </div>

      <div className="mt-3 md:mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3 md:space-y-4.5" onSubmit={handleSubmit}>

        { error && 
        <div className="p-4 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Alert ! </span> {error}
        </div>
        }

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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md mt-4 bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Login
            </button>
            <p className="mr-3 mt-2 text-[15px] md:text-[16px] font-medium leading-6">Doesn't have an account ? <Link to="/signup" className="text-orange-600 hover:underline">Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;