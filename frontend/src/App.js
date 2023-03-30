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
// import Payment from "./component/Payment";
import { UserContext } from "../src/context/user/UserContext";
import Suppliers from "./component/Suppliers";
import Payment2 from "./component/Payment2";

const stripePromise = loadStripe(
  "pk_test_51MqDrPSJBLpKte0CMzsdo03pSLmK9ROMDTSPyJhjGH1wpkgiKYuolgGcnANo9IuLpxW8nG6CJikR6eIlvm7UPcOr00XTX5eqci"
);

console.log(stripePromise);

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  // const { state } = useContext(UserContext);
  // console.log(state);
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${state.user.token}`,
  //   },
  // };

  useEffect(() => {
    const getStripeApiKey = async () => {
      const { data } = await axios.get("/api/payment/stripeapikey");
      console.log("data", data);
      setStripeApiKey(data.stripeApiKey);
      console.log(stripeApiKey);
    };
    getStripeApiKey();
  }, [stripeApiKey]);

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

            <Route path="/admin/users" element={<UserMangement />} />
            <Route path="/admin/suppliers" element={<Suppliers />} />
            <Route path="/admin/purchases" element={<Purchases />} />
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
