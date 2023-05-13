import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { Buffer } from "buffer";
import Swiper from "./Swiper";
import { getProdct } from "../context/product/ProductActions";
import { UserContext } from "../context/user/UserContext";

const Home = () => {
  const [products, setProducts] = useState(null);
  const { state } = useContext(UserContext);

  const [filteredData, setFilteredData] = useState(products);

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdct();
      console.log("data", data);
      setProducts(data.products);
    };
    fetchProducts();
  }, [state?.user?.token]);

  console.log("products", products);
  return (
    <>
      <Swiper />
      <div className=" bg-[#fbf8f8]">
        <div className="flex flex-row p-4 gap-x-8 flex-wrap justify-around ">
          {products &&
            products?.map((item) => <Card item={item} key={item._id} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
