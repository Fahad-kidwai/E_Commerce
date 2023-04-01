import axios from "axios";

export default async function displayRazorpay() {
  //   const data = await fetch("http://localhost:5000/razorpay", {
  //     method: "POST",
  //   }).then((t) => t.json());

  const response = await axios.post("/razorpay");
  const data = response.data;

  console.log(data);

  const options = {
    key: "rzp_test_o05Pgdf286j2Pl",
    currency: data.currency,
    amount: data.amount,
    description: "Wallet transaction",
    image:
      "https://lh5.googleusercontent.com/a49iOM_H_VAb3pxVscYwuk7CWsqF7n2pxs6IeB0MKWt5K4adnD_yjl2dB74LH8AnJ8E=w2400",
    order_id: data.id,
    handler: function (response) {
      alert("PAYMENT ID:" + response.razorpay_payment_id);
      alert("ORDER ID:" + response.razorpay_order_id);
    },
    prefill: {
      name: "Mohd Imran",
      email: "imran@cloudfort.in",
      contact: "453453445",
    },
  };

  const paymentObject = new window.Razorpay(options);

  paymentObject.open();
}
