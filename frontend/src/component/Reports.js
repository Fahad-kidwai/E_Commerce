import { Fragment, useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user/UserContext";
import axios from "axios";
import { CSVLink } from "react-csv";
import AdminSlider from "./AdminSlider";
import { getAllPurchases } from "../context/purchase/PurchaseActions";
// import { BarChart } from "./BarChart";

export const Reports = () => {
  // Chart.register(CategoryScale);
  const [orders, setOrders] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [filterData, setFilterData] = useState(null);
  const { state } = useContext(UserContext);
  const token = state.user.token;
  let currentDate = new Date();
  // const csvData = [];

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
    const fetchPurchases = async () => {
      const purchases = await getAllPurchases(token);
      setPurchases(purchases);
      // console.log("purchases", purchases);
    };

    fetchMyOrders();
    fetchPurchases();
  }, [token]);

  const filteredCollections = orders?.filter((collection) => {
    const creationDate = new Date(collection.createdAt).getDate();
    const currentDate = new Date();
    const daysAgo = 20; // Number of days to look back
    const dateThreshold = currentDate.getDate() - daysAgo;
    return creationDate >= dateThreshold;
  });

  const filteredPurchases = purchases?.filter((collection) => {
    const creationDate = new Date(collection.createdAt).getDate();
    const currentDate = new Date();
    const daysAgo = 0; // Number of days to look back
    const dateThreshold = currentDate.getDate() - daysAgo;
    return creationDate >= dateThreshold;
  });

  const accumulatedOrders = filteredCollections.reduce((acc, collection) => {
    const date = new Date(collection.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    filteredPurchases.forEach((element) => {
      if (date === new Date(element.createdAt).toLocaleDateString()) {
        collection.purchase = element.totalAmnt;
      }
    });
    acc[date].push(collection);
    return acc;
  }, {});

  const accumulatedPurchases = filteredPurchases.reduce((acc, collection) => {
    const date = new Date(collection.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(collection);
    return acc;
  }, {});
  console.log("accumulated", accumulatedOrders);
  console.log("accumulated", accumulatedPurchases);

  const tableData = async () => {
    const table = document.querySelector("#report"); // replace with your table ID or class
    const rows = table.rows;
    const data = [];
    // loop through rows
    for (let i = 1; i < rows.length; i++) {
      // start at 1 to skip header row
      const row = rows[i];
      const rowData = [];

      // loop through cells
      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].textContent);
      }

      data.push(rowData);
    }
    // this will log the table data to the console
    // data1.push(data);
    csvData.push(data);
    setCsvData(data);
    console.log(csvData);
  };

  const head = [
    "Date",
    "No of Orders",
    "Total Order Price",
    "Total Purchasing",
  ];
  // console.log(document.querySelector("table").outerHTML);

  return (
    <Fragment>
      <AdminSlider />
      <div className="p-2 sm:ml-64 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">Report</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table id="report" className="table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>No of Orders</th>
                  <th>Total Order Price</th>
                  <th>Total Purchasing</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(accumulatedOrders).map(
                  ([date, collections]) => (
                    <tr key={date} className="bg-slate-400">
                      <td>{date}</td>
                      <td>{collections.length}</td>
                      <td>
                        {collections.reduce(
                          (acc, collection) => acc + collection.itemsPrice,
                          0
                        )}
                      </td>
                      <td>
                        {collections.reduce(
                          (acc, collection) => acc + collection.purchase,
                          0
                        )}
                      </td>
                      {/* {collections.map((collection) => (
                    <div key={collection.id}>
                      <h3>{collection.orderItems.length}</h3>
                      <p>{collection.itemsPrice}</p>
                      <p>Created on: {collection.createdAt}</p>
                    </div>
                  ))} */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {/* <CSVDownload data={csvData} target="_blank" /> */}
            <CSVLink data={csvData} headers={head} filename="Report.csv">
              <button className="btn " onClick={tableData}>
                Export
              </button>
            </CSVLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
