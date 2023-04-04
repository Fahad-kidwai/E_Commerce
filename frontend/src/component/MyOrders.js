import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState(null);
  const state = useContext(UserContext);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        };

        // const response = await axios.get(API_URL + sl_Id, config);
        const myOrders = await axios.get("api/order/me", config);
        console.log("myOrders", myOrders);
        setOrders(myOrders.data);
      } catch (error) {
        throw error;
      }
    };
    fetchMyOrders();
  }, []);

  return (
    <div className="card card-compact w-72 h-96 bg-base-100 shadow-xl mb-4 hover:scale-110 ">
      <div className="card-body">
        <h2 className="card-title">{orders.shippeingInfo.address}</h2>
        <p>{orders.orderItems}</p>
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
  );
};

export default MyOrders;
