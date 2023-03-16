import { Link } from "react-router-dom";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

function ImageSlider() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* <p className="exploreHeading text-[2rem] mb-4">Recommended</p> */}

      <Swiper
        className=" mt-20"
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={true}
      >
        <SwiperSlide key={1}>
          <Link to={`/pizza/${1}`}>
            <div
              style={{
                background: `url("https://images.unsplash.com/photo-1558818498-28c1e002b655?ixlib=rb-4.0.3&dl=rodion-kutsaiev-EPwuZxdketc-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb") center no-repeat`,
              }}
              className="swiperSlideDiv h-[50vh]"
            >
              {/* <p className="swiperSlideText">NAME</p>
              <p className="swiperSlidePrice">$2.5</p> */}
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide key={2}>
          <div
            style={{
              background: `url("https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&dl=nadine-primeau--ftWfohtjNw-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb") center no-repeat`,
              backgroundSize: "cover",
            }}
            className="swiperSlideDiv h-[50vh]"
          >
            {/* <p className="swiperSlideText">NAME</p>
            <p className="swiperSlidePrice">$2.5</p> */}
          </div>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <div
            style={{
              background: `url("https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&dl=randy-fath-5aJVJvJ9rG8-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb") center no-repeat`,
              backgroundSize: "cover",
            }}
            className="swiperSlideDiv h-[50vh]"
          >
            {/* <p className="swiperSlideText">NAME</p>
            <p className="swiperSlidePrice">$2.5</p> */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;
