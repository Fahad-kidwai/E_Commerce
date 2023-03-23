import React, { Fragment, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
            {myProducts.length === 0 && (
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
          {myProducts.length >= 1 && (
            <div className=" float-right w-60 mt-6 border-t-2 border-green-600">
              <div className="flex justify-between">
                <p>Sub Total</p>{" "}
                <p>₹{myProducts.reduce((acc, item) => acc + item.total, 0)}</p>
              </div>
              <div></div>
              <div>
                <button
                  className="btn btn-ghost btn-xs ml-[0.5rem] transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                  data-te-toggle="tooltip"
                  data-te-placement="bottom"
                  data-te-ripple-init
                  data-te-ripple-color="green"
                  hover
                  title="Order"
                >
                  Check Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
