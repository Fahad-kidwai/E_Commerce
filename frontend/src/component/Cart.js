import React, { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const myProducts = JSON.parse(localStorage.getItem("cartItems"));
  console.log("products", typeof myProducts);
  console.log("products", myProducts[0].sku);

  return (
    <Fragment>
      <div class="p-2 sm:ml-8 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">My Cart</h1>
          </div>
          <div className="overflow-x-auto w-full mt-[1rem]">
            <table className="table w-full">
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
                    (item) => (
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
          </div>
          <div className="mt-6">
            <div>
              Sub Total <span>{"-   "}</span> 1200
            </div>
            <div></div>
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
      </div>
    </Fragment>
  );
};

export default Cart;
