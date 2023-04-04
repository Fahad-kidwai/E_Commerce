import axios from "axios";
import { useNavigate } from "react-router-dom";

export default async function displayRazorpay(dataObj) {
  const { price, shippingInfo, orderItems, token } = dataObj.data;
  console.log(price, shippingInfo, orderItems, token);
  const amnt = parseInt(price);
  console.log(typeof amnt);

  const response = await axios.post("http://localhost:5000/razorpay", dataObj);
  const x = response.data;
  console.log(x);

  const options = {
    key: "rzp_test_9gKa7yzIUkK8FE",
    currency: x.currency,
    amount: x.amount,
    description: "Wallet transaction",
    image:
      "https://lh5.googleusercontent.com/a49iOM_H_VAb3pxVscYwuk7CWsqF7n2pxs6IeB0MKWt5K4adnD_yjl2dB74LH8AnJ8E=w2400",
    order_id: x.id,
    handler: function (r) {
      console.log(r);
      if (r.razorpay_payment_id) {
        const paymentInfo = {
          id: r.razorpay_payment_id,
          status: "Processed",
        };
        const orderData = {
          shippingInfo,
          orderItems,
          paymentInfo,
          itemsPrice: amnt,
          // taxPrice,
          // shippingPrice,
          // totalPrice
        };

        const order = createOrder(orderData, token);
        if (order) {
          console.log("order created", order);
        }
      }
    },
    prefill: {
      name: "FreshHarvest.com",
      email: "frashharvest@gmail.com",
      contact: "453453445",
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
}

const createOrder = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("config", config);
  const order = await axios.post("/api/order/", data, config);
  console.log("Pjs order", order);

  return order;
};
