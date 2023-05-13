import React, { useContext, useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";
import { UserContext } from "../context/user/UserContext";

const Card = ({ item }) => {
  const { state } = useContext(UserContext);
  const [qty, setQty] = useState(1);
  const addToCart = async (id) => {
    console.log("onClick", id);
    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const quantity = qty;
    const { data } = await axios.get(`/api/product/${id}`, config);
    console.log({ data });
    const amt = quantity * data.products.price;
    const product = {
      id: data.products._id,
      sku: data.products.sku,
      price: data.products.price,
      quantity: quantity,
      total: amt,
    };

    let dArray = localStorage.getItem("cartItems");
    console.log(dArray);

    if (dArray) {
      dArray = JSON.parse(dArray);
    } else {
      dArray = [];
    }
    console.log(typeof dArray);
    console.log(Array.isArray(dArray));
    dArray.push(product);

    localStorage.setItem("cartItems", JSON.stringify(dArray));
  };

  const handleIncDec = (id, type) => {
    const filteredQty = type === "inc" ? qty + 1 : qty - 1;
    console.log("newQty", filteredQty);
    setQty(filteredQty);
  };

  return (
    <div className="card card-compact w-72 h-80 bg-base-100 shadow-xl mt-8 hover:scale-110 ">
      <figure className=" max-h-60">
        <img src={item.image && item.image.secure_url} alt="Images" />
      </figure>
      <div className="card-body">
        <h2 className="card-title p-0 leading-3">{item.name}</h2>
        <p>{item.sku}</p>
        <p className=" leading-3">
          Price -{item.price}/{item.qParam}
        </p>
        <div className="card-actions justify-end">
          <div className="btn-group">
            <button
              className="btn w-2 h-10 bg-black text-white   focus:bg-slate-200"
              onClick={() => {
                handleIncDec(item._id, "dec");
              }}
            >
              -
            </button>
            <input
              type="text"
              // placeholder="Qty"
              min={1}
              value={qty + item.qParam}
              className=" p-2 max-w-[3rem] font-normal"
              onChange={(e) => {
                console.log(e);
                handleIncDec(item._id, "inc");
              }}
            />
            <button
              className="btn w-2 h-10 bg-black text-white   focus:bg-slate-200"
              onClick={() => handleIncDec(item._id, "inc")}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary bg-black hover:bg-slate-500 focus:bg-slate-200 "
            onClick={() => addToCart(item._id)}
          >
            Add To Cart
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
