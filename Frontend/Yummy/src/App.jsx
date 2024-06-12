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
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import EditProfile from "./Components/EditProfile";
import Account from "./Components/Account";
import ProtectedRoute from "./Components/ProtectedRoute";
import OrderHistory from "./Components/OrderHistory";
import PastOrders from "./Components/PastOrders";

function Main() {
  return (
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
  );
}

function App() {
  return (
    <CartContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/main" element={<Main />} />
            <Route path="/delivery" element={<OrderHistory />} />
            <Route path="/myaccount" element={<Account />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/pastorders" element={<PastOrders />} />
            <Route path="/orders" element={<Orders />} />
          </Route>

        </Routes>
      </Router>
    </CartContextProvider>
  );
}

export default App;