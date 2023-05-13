import { useEffect, useState, useContext, Fragment } from "react";
import { UserContext } from "../context/user/UserContext";
import AdminSlider from "./AdminSlider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Delievery = () => {
  const [orders, setOrders] = useState([]);

  const { state } = useContext(UserContext);
  const token = state.user.token;

  const navigate = useNavigate("/admin/delievery");
  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        console.log("started");
        const allOrders = await axios.get("/api/order/admin", config);
        console.log("myOrders", allOrders.data.orders);
        setOrders(allOrders.data.orders);
      } catch (error) {
        throw error;
      }
    };
    fetchMyOrders();
  }, [token]);

  const handleDeliever = async (id) => {
    console.log(id);
    const token = state.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("started");
    const data = new FormData();
    data.append("orderStatus", "Delivered");
    const updated = await axios.put("/api/order/admin/" + id, config, data);
    if (updated.success) {
      toast.success("Updated");
    }
  };

  return (
    <Fragment>
      <AdminSlider />

      <div className="p-2 sm:ml-64 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">Delivery Management</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Status</th>
                  {/* <th>Selling Price</th>
                      <th>Stock</th> */}
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id} className="bg-slate-400">
                      <td>{order._id}</td>
                      <td>
                        {order.orderStatus}{" "}
                        <button
                          className="btn ml-8 focus:bg-slate-600"
                          onClick={() => {
                            handleDeliever(order._id);
                          }}
                        >
                          Delievered
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Delievery;
