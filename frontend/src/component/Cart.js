import React, { Fragment, useEffect, useState } from "react";
import { FaTrash, FaHome, FaCity } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { GooglePayButton } from "@google-pay/button-react";

const Cart = () => {
  const myProducts = JSON.parse(localStorage.getItem("cartItems"));
  const [state, setState] = useState(myProducts);

  const deleteItem = (id) => {
    console.log(id);
    // localStorage.removeItem('Name');
    // localStorage.removeItem('Image');

    // setState((s) => s.filter((_, index) => index !== removeindex));
    let filteredArray = myProducts.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("cartItems", JSON.stringify(filteredArray));
    setState(filteredArray);
  };

  const [formData, setFormData] = useState({
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: null,
    phone: null,
  });

  let total = 1000;

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheckOut = async () => {
    if (total >= 1000) {
      document.getElementById("my-modal-3").checked = true;
    } else {
      toast(
        "FreshHarvest is a wholesale platfom, item total should be greater than ₹1000"
      );
    }
    // console.log("Data = ", formData);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (total >= 1000) {
      navigate("/payment", { state: formData });
    } else {
      toast(
        "FreshHarvest is a wholesale platfom /n item total should be greater than  ₹ 1000"
      );
    }
    // console.log("Data = ", formData);
  };
  return (
    <Fragment>
      <div class="p-2 sm:ml-8 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">My Cart</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table id="cartTable" className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myProducts &&
                  myProducts.map(
                    (item, index) => (
                      <tr>
                        <td>
                          <Link
                            to="/"
                            className=" text-green-600 hover:underline"
                          >
                            {item.sku}
                          </Link>
                        </td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                        <th>
                          {" "}
                          <button
                            className="btn btn-ghost btn-xs ml-[0.5rem]"
                            data-te-toggle="tooltip"
                            data-te-placement="bottom"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            title="Delete"
                            onClick={() => deleteItem(item.id)}
                          >
                            <FaTrash
                              className="h-[18px] w-[18px]"
                              fill="#800812"
                            />
                          </button>
                        </th>
                      </tr>
                    )

                    // (
                    //   <Table
                    //     item={item}
                    //     key={item._id}
                    //     // setEditFormData={setEditFormData}
                    //   />
                    // )
                  )}
              </tbody>
            </table>
            {!myProducts && (
              <div className="flex justify-items-center flex-col mt-5">
                <div>
                  <h1 className=" text-red-600">It seems your cart is empty</h1>
                </div>
                <Link to={"/"}>
                  <button className="btn btn-primary">Add Products</button>
                </Link>
              </div>
            )}
          </div>
          {myProducts && myProducts.length >= 1 && (
            <div className=" float-right w-60 mt-6 border-t-2 border-green-600">
              <div className="flex justify-between">
                <p>Sub Total</p>{" "}
                <p id="total">
                  ₹{myProducts.reduce((acc, item) => acc + item.total, 0)}
                </p>
              </div>
              <div></div>
              <div>
                <button
                  className="btn btn-ghost btn-xs text-white mt-2 transition-colors duration-200 transform hover:bg-green-900 rounded-md bg-green-600 focus:outline-none focus:bg-yellow-400"
                  data-te-toggle="tooltip"
                  data-te-placement="bottom"
                  data-te-ripple-init
                  data-te-ripple-color="green"
                  hover
                  title="Order"
                  onClick={handleCheckOut}
                >
                  Check Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* modal for shipping info */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form className="mt-6" onSubmit={handleNext}>
            <div className="mb-2">
              <label
                for="address"
                className="block text-sm font-semibold text-gray-800"
              >
                Address
              </label>
              <input
                type="address"
                name="address"
                id="address"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className=" mb-2 flex items-center">
              <MdPublic />
              <select
                className="flex-1"
                required
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {formData.country && (
              <div className=" mb-2 flex items-center">
                <FaHome />
                <select
                  className=" flex-1"
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(formData.country).map((x) => (
                      <option key={x.isoCode} value={x.isoCode}>
                        {x.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {formData.state && (
              <div className=" mb-2 flex items-center">
                <FaCity />
                <select
                  className="flex-1"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">City</option>
                  {City &&
                    City.getCitiesOfCountry(formData.country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="mb-2">
              <label
                for="pinCode"
                className="block text-sm font-semibold text-gray-800"
              >
                Pin Code
              </label>
              <input
                type="number"
                name="pinCode"
                id="pinCode"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                for="phone"
                className="block text-sm font-semibold text-gray-800"
              >
                Contact
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                onChange={handleChange}
                required
                className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-red-300 focus:outline-none focus:bg-yellow-400"
              >
                Proceed to Payment
              </button>

              {/* <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "USD",
                    countryCode: "US",
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log("load payment data", paymentRequest);
                }}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
