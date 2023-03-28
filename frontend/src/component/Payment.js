import { Fragment } from "react";
import { FaCreditCard, FaEvent } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Payment = () => {
  const myProducts = JSON.parse(localStorage.getItem("cartItems"));
  const { state } = useLocation();
  console.log(state);
  const submitHandler = async (e) => {
    console.log(e);
  };
  return (
    <Fragment>
      <div className="fixed top-16  m-4 p-4  w-full ">
        <h1 className=" text-center">Order Page</h1>
        <div className="mt-2 p-8">
          <h6>Bill Summary</h6>
          <div className=" flex justify-between mt-4">
            {" "}
            <p>Items Total</p>
            <p>₹{myProducts.reduce((acc, item) => acc + item.total, 0)}</p>
          </div>
        </div>
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <h1>Card Info</h1>
            <div>
              <FaCreditCard />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              {/* <FaEvent /> */}
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              {/* < /> */}
              <CardCvcElement className="paymentInput" />
            </div>

            <input
              type="submit"
              value={`Pay - ₹${myProducts.reduce(
                (acc, item) => acc + item.total,
                0
              )}`}
              // ref={payBtn}
              className="paymentFormBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
