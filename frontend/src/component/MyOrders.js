import React, { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState(null);
  const { state } = useContext(UserContext);
  const token = state.user.token;

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // const response = await axios.get(API_URL + sl_Id, config);
        const myOrders = await axios.get("api/order/me/", config);
        console.log("myOrders", myOrders.data.orders);
        setOrders(myOrders.data.orders);
      } catch (error) {
        throw error;
      }
    };
    fetchMyOrders();
  }, [token]);

  return (
    <Fragment>
      {/* <div class="p-2 sm:ml-64 "> */}
      <div className="mb-[5rem] p-1"></div>
      <div className=" m-2">
        <h1 className="font-bold text-2xl mt-20 text-green-900 text-center">
          My Orders
        </h1>
      </div>
      {orders &&
        orders?.map((item) => (
          <div className="card card-compact w-auto shadow-xl mb-4 sm:mr-48 sm:ml-48 bg-gray-50">
            <div className="card-body">
              <h2 className="card-title">{item.shippingInfo.address}</h2>
              <p>{item.itemsPrice}</p>
              {/* <p>
            Price -{item.price}/{item.q_Param}
          </p> */}
              {/* <div className="card-actions justify-around">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(item._id, 10)}
            >
              Add To Cart
            </button>
          </div> */}
            </div>
          </div>
        ))}
      {/* </div> */}
    </Fragment>
  );
};

export default MyOrders;
