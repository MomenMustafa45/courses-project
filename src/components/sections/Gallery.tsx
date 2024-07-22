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
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";
import GalleryModal from "../GalleryModal";
import ImageModal from "../ImageModal";

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
  const [showModal, setShowModal] = useState(false);
  const [showModalBottomLeft, setShowModalBottomLeft] = useState({
    show: false,
    imgIndex: 0,
  });

  return (
    <section className="my-20" id="gallery">
      <div className="special-word !mb-10">
        <h1 className="h1-special text-[50px] md:text-[100px]">معرض الصور</h1>
        <p className="p-special">معرض الصور</p>
      </div>
      <div className="container mx-auto">
        <PrimaryButton classes="" onClickHandler={() => setShowModal(true)}>
          اعرض جميع الصور
        </PrimaryButton>
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
          {arrayOfImages.map((img, index) => (
            <SwiperSlide
              key={img}
              className="h-full"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                onClick={() => {
                  setShowModalBottomLeft({
                    ...showModalBottomLeft,
                    show: true,
                    imgIndex: index,
                  });
                }}
              >
                <img
                  src={img}
                  alt=""
                  className="h-[250px] w-[auto] rounded-md"
                />
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
        {/* Modal */}
        <GalleryModal
          showModal={showModal}
          setShowModal={setShowModal}
          arrayOfImages={arrayOfImages}
        />
        {/* Modal */}

        {/* <!--Bottom left modal--> */}
        <ImageModal
          setShowModalBottomLeft={setShowModalBottomLeft}
          showModalBottomLeft={showModalBottomLeft.show}
          img={arrayOfImages[showModalBottomLeft.imgIndex]}
        />

        {/* <!--Bottom left modal--> */}
      </div>
    </section>
  );
};

export default Gallery;
