import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Inventory from "./component/Inventory";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import UserMangement from "./component/UserMangement";
import { UserProvider } from "./context/user/UserContext";
// import { ProductProvider } from "./context/product/ProductContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./component/Cart";
import About from "./component/About";
import Purchases from "./component/Purchases";
import Suppliers from "./component/Suppliers";
import MyOrders from "./component/MyOrders";
import { Reports } from "./component/Reports";
import Delievery from "./component/Delievery";

function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <>
      <UserProvider>
        {/* <ProductProvider> */}
        {/* <Route exact path="/payment" element={<Payment2 />} /> */}

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/" element={<Inventory />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<MyOrders />} />

            <Route path="/admin/users" element={<UserMangement />} />
            <Route path="/admin/suppliers" element={<Suppliers />} />
            <Route path="/admin/purchases" element={<Purchases />} />
            <Route path="/admin/report" element={<Reports />} />
            <Route path="/admin/delievery" element={<Delievery />} />
            {/* <Route
                  element={
                    window.location.pathname === "/payment" ? null : "NotFound"
                  }
                /> */}
            {/* <Route
                exact
                path="/payment"
                element={
                  <Elements stripe={null}>
                    <Payment2 />
                  </Elements>
                }
              /> */}
          </Routes>
        </Router>

        <ToastContainer />
        {/* </ProductProvider> */}
      </UserProvider>
    </>
  );
}

export default App;
