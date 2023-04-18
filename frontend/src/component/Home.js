import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
// import Slider from "./Slider";
import { Buffer } from "buffer";
import Swiper from "./Swiper";

// import { ProductContext } from "../context/product/ProductContext";
import { getProdct } from "../context/product/ProductActions";
import { UserContext } from "../context/user/UserContext";

const Home = () => {
  const [products, setProducts] = useState(null);
  // const { productState, productDispatch } = useContext(ProductContext);
  const { state } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProdct(state.user.token);
      console.log("data", data);
      setProducts(data.products);

      // productDispatch({ type: "GET_PRODUCTS", payload: data });
    };
    fetchProducts();
  }, [state?.user?.token]);

  console.log("products", products);

  // const prodct = [
  //   "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&dl=lars-blankers-B0s3Xndk6tw-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  //   "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&dl=david-holifield-uidpH617Fb8-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  //   "https://images.unsplash.com/photo-1588891557811-5f2fba9e3009?ixlib=rb-4.0.3&dl=gil-ndjouwou-3YTtK5LRtDI-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  // ];
  return (
    <>
      <Swiper />
      <div className=" bg-[#e7eaea]">
        <div className="flex flex-row p-4 gap-x-8 flex-wrap justify-around ">
          {products &&
            products?.map((item) => <Card item={item} key={item._id} />)}
        </div>
      </div>
    </>
  );
};

export default Home;
