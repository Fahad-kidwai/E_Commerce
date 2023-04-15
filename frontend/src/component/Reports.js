import { Fragment, useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";
// import Chart from "chart.js/auto";
// import { CategoryScale } from "chart.js";
import AdminSlider from "./AdminSlider";
// import { BarChart } from "./BarChart";

export const Reports = () => {
  // Chart.register(CategoryScale);
  const [orders, setOrders] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const { state } = useContext(UserContext);
  const token = state.user.token;
  let currentDate = new Date();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const allOrders = await axios.get("/api/order/admin", config);
        console.log("myOrders", allOrders.data.orders);
        setOrders(allOrders.data.orders);
      } catch (error) {
        throw error;
      }
    };
    fetchMyOrders();
  }, [token]);
  // const dataFilter = async (dateRange) => {
  const filteredCollections = orders?.filter((collection) => {
    const creationDate = new Date(collection.createdAt).getDate();
    const currentDate = new Date();
    const daysAgo = 20; // Number of days to look back
    const dateThreshold = currentDate.getDate() - daysAgo;
    console.log("Date", new Date(collection.createdAt).getDate());
    console.log(currentDate.getDate() - daysAgo);
    return creationDate >= dateThreshold;
  });

  console.log("filtered", filteredCollections);
  const accumulatedData = filteredCollections.reduce((acc, collection) => {
    const date = new Date(collection.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(collection);
    return acc;
  }, {});
  console.log("accumulated", accumulatedData);
  // }
  // dataFilter(20);

  // const barData = {
  //   lables: orders?.map((data) =>
  //     new Date(data.createdAt).toLocaleDateString()
  //   ),
  //   datasets: [
  //     {
  //       label: "Users",
  //       data: orders?.map((data) => data.itemsPrice),
  //     },
  //   ],
  // };

  // const Data = [
  //   {
  //     id: 1,
  //     year: 2016,
  //     userGain: 80000,
  //     userLost: 823,
  //   },
  //   {
  //     id: 2,
  //     year: 2017,
  //     userGain: 45677,
  //     userLost: 345,
  //   },
  //   {
  //     id: 3,
  //     year: 2018,
  //     userGain: 78888,
  //     userLost: 555,
  //   },
  //   {
  //     id: 4,
  //     year: 2019,
  //     userGain: 90000,
  //     userLost: 4555,
  //   },
  //   {
  //     id: 5,
  //     year: 2020,
  //     userGain: 4300,
  //     userLost: 234,
  //   },
  // ];

  return (
    <Fragment>
      <AdminSlider />
      <div className="p-2 sm:ml-64 "></div>
      <div className="mb-[10rem] p-1">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mt-20">Inventory Panel</h1>
        </div>
        <div className="overflow-x-auto w-full mt-[1rem]">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th></th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
