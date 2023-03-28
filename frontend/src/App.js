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
import { ProductProvider } from "./context/product/ProductContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./component/Cart";
import About from "./component/About";
import Purchases from "./component/Purchases";
import Payment from "./component/Payment";
import { UserContext } from "../src/context/user/UserContext";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  // const { state } = useContext(UserContext);
  // console.log(state);
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${state.user.token}`,
  //   },
  // };
  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/payment/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  //   console.log(stripeApiKey);
  // }

  // useEffect(() => {
  //   getStripeApiKey();
  // }, []);

  return (
    <>
      <UserProvider>
        <ProductProvider>
          <Router>
            <Navbar />
            {/* {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Route exact path="/process/payment" component={Payment} />
              </Elements>
            )} */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/" element={<Inventory />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/about" element={<About />} />

              <Route path="/admin/users" element={<UserMangement />} />
              <Route path="/admin/purchases" element={<Purchases />} />
              <Route
                component={
                  window.location.pathname === "/process/payment"
                    ? null
                    : "NotFound"
                }
              />
            </Routes>
          </Router>
          <ToastContainer />
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
