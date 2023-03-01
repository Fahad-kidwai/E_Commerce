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
      <p className="exploreHeading text-[2rem] mb-4">Recommended</p>

      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={true}
      >
        <SwiperSlide key={1}>
          <Link to={`/pizza/${1}`}>
            <div
              style={{
                background: `url("https://lh6.googleusercontent.com/8RJeWIyQUR_lMZd7oMkyJVirEcO4c1SB60wmZe_YO06DysbXdUZOnEKuo1MgXFmxMdw=w1200-h630-p") center no-repeat`,
              }}
              className="swiperSlideDiv h-[40vh]"
            >
              <p className="swiperSlideText">NAME</p>
              <p className="swiperSlidePrice">$2.5</p>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide key={2}>
          <div
            style={{
              background: `url("https://i.ibb.co/0s8WpSn/mahyar-motebassem-p-GA4z-Hvpo5-E-unsplash.jpg") center no-repeat`,
              backgroundSize: "cover",
            }}
            className="swiperSlideDiv h-[40vh]"
          >
            <p className="swiperSlideText">NAME</p>
            <p className="swiperSlidePrice">$2.5</p>
          </div>
        </SwiperSlide>
        <SwiperSlide key={3}>
          <div
            style={{
              background: `url("https://i.ibb.co/0s8WpSn/mahyar-motebassem-p-GA4z-Hvpo5-E-unsplash.jpg") center no-repeat`,
              backgroundSize: "cover",
            }}
            className="swiperSlideDiv h-[40vh]"
          >
            <p className="swiperSlideText">NAME</p>
            <p className="swiperSlidePrice">$2.5</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;
