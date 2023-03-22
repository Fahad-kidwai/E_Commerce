import React, { useContext } from "react";
import { Buffer } from "buffer";
// import { addItemsToCart } from "../context/cart/CartActions";
import axios from "axios";
import { UserContext } from "../context/user/UserContext";

const Card = ({ item }) => {
  const { state } = useContext(UserContext);
  // console.log("Function loaded");
  // console.log(item);
  const addToCart = async (id, quantity) => {
    console.log("onClick", id, quantity);
    // const response = await addItemsToCart(e, 1);
    // console.log("Carting", response);

    const config = {
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const { data } = await axios.get(`/api/product/${id}`, config);
    console.log({ data });
    const amt = quantity * data.products.price;
    const product = {
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

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl mb-4">
      <figure>
        <img
          src={`data:${item.image.contentType};base64, ${Buffer.from(
            item.image.data
          ).toString("base64")}`}
          alt="Images"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.sku}</p>
        <p>
          Price -{item.price}/{item.q_Param}
        </p>
        <div className="card-actions justify-around">
          <button
            className="btn btn-primary"
            onClick={() => addToCart(item._id, 10)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
