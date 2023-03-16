import React, { Fragment } from "react";

const Cart = () => {
  return (
    <Fragment>
      <div class="p-2 sm:ml-8 ">
        <div className="mb-[10rem] p-1">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl mt-20">Inventory Panel</h1>
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
                {/* {products &&
                  products.map((item) => (
                    <Table
                      item={item}
                      key={item._id}
                      // setEditFormData={setEditFormData}
                    />
                  ))} */}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row">
            <div className="">
              Sub Total <span>{"-   "}</span> 1200
            </div>
            <div></div>
            <button
              className="btn btn-ghost btn-xs ml-[0.5rem] transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
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
