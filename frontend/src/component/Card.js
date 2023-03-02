import React from "react";

const Card = ({ item }) => {
  console.log("Function loaded");
  console.log(item);
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={item} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Potato</h2>
        <p>Desi Potato</p>
        <p>Price ${10}</p>
        <div className="card-actions justify-around">
          <button className="btn btn-primary">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
