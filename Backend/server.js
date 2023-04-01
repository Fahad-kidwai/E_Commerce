const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const shortid = require("shortid");
const Razorpay = require("razorpay");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const razorpay = new Razorpay({
  key_id: "rzp_test_o05Pgdf286j2Pl",
  key_secret: "SWljt4PzToaUySsTwuPwO3HE",
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 99;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  console.log(typeof options.amount);

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/supplier", require("./routes/supplierRoutes"));
app.use("/api/purchase", require("./routes/purchaseRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
