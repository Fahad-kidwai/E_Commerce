import React from "react";
import Card from "./Card";
// import Slider from "./Slider";
import Swiper from "./Swiper";

const Home = () => {
  const prodct = [
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&dl=lars-blankers-B0s3Xndk6tw-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-4.0.3&dl=david-holifield-uidpH617Fb8-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
    "https://images.unsplash.com/photo-1588891557811-5f2fba9e3009?ixlib=rb-4.0.3&dl=gil-ndjouwou-3YTtK5LRtDI-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb",
  ];
  return (
    <>
      <Swiper />
      <div className="flex flex-row p-4 gap-x-8 flex-wrap justify-around ">
        {prodct.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </>
  );
};

export default Home;
