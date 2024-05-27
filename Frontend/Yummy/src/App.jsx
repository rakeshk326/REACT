import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartContextProvider from "./Contexts/CartContext";
import TopNav from "./Components/TopNav";
import Featured from "./Components/Featured";
import Delivery from "./Components/Delivery";
import TopPicks from "./Components/TopPicks";
import Meals from "./Components/Meals";
import Categories from "./Components/Categories";
import NewsLettter from "./Components/NewsLettter";
import Footer from "./Components/Footer";
import Orders from "./Components/Orders";
import Login from "./Components/Login";
import Account from "./Components/Account";
import OrderHistory from "./Components/OrderHistory";

function Main() {
  return (
    <>
    <CartContextProvider>
        <main>
          <TopNav />
          <Featured />
          <Delivery />
          <TopPicks />
          <Meals />
          <Categories />
          <NewsLettter />
          <Footer />
        </main>
      </CartContextProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CartContextProvider> <Login /> </CartContextProvider>}/>
        <Route path="/main" element={<Main />}/>
        <Route path="/delivery" element={<CartContextProvider> <OrderHistory /> </CartContextProvider>}/>
        <Route path="/myaccount" element={<CartContextProvider> <Account /> </CartContextProvider>}/>
        <Route path="/orders" element={<CartContextProvider> <Orders /> </CartContextProvider>}/>
      </Routes>
    </Router>
  );
}

export default App;
