import React, { Fragment } from "react";
import Utable from "./Utable";
import AdminSlider from "./AdminSlider";

const UserMangement = () => {
  const product = [
    {
      sku: "Desi Potato",
      price: 20,
      qp: "kg",
      stock: 100,
      pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
    },
    {
      sku: "Orange Carrot",
      price: 20,
      qp: "kg",
      stock: 100,
      pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
    },
    {
      sku: "Fresh Pea",
      price: 20,
      qp: "kg",
      stock: 100,
      pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
    },
    {
      sku: "Pahadi Chilli",
      price: 20,
      qp: "kg",
      stock: 100,
      pic: "https://i.ibb.co/bJ6tKqh/stretched-1920-1080-888979.jpg",
    },
  ];
  return (
    <Fragment>
      <AdminSlider />
      <div class="p-2 sm:ml-64 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">User Management</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <Utable item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserMangement;
