import galleryImg1 from "../../assets/images/galleryImg1.png";
import galleryImg2 from "../../assets/images/galleryImg2.png";
import galleryImg3 from "../../assets/images/galleryImg3.png";
import galleryImg4 from "../../assets/images/galleryImg4.png";
import galleryImg5 from "../../assets/images/galleryImg5.png";
import galleryImg6 from "../../assets/images/galleryImg6.png";
import galleryImg7 from "../../assets/images/galleryImg7.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const arrayOfImages = [
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg4,
  galleryImg5,
  galleryImg6,
  galleryImg7,
];

const Gallery = () => {
  return (
    <section className="my-40" id="gallery">
      <div className="container mx-auto">
        <Swiper
          style={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            "--swiper-pagination-color": "#D9A8A4",
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[350px]"
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {arrayOfImages.map((img) => (
            <SwiperSlide
              key={img}
              className="h-full"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="">
                <img src={img} alt="" className="h-[250px] w-[auto]" />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next after:hidden !w-10 !h-10 bg-pink-default rounded-full flex items-center justify-center">
            <IoIosArrowForward color="#fff" />
          </div>
          <div className="swiper-button-prev after:hidden !w-10 !h-10 bg-pink-default rounded-full flex items-center justify-center">
            <IoIosArrowBack color="#fff" size={10} />
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
