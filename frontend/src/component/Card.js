import React from "react";
import { Buffer } from "buffer";

const Card = ({ item }) => {
  // console.log("Function loaded");
  // console.log(item);
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
          <button className="btn btn-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
