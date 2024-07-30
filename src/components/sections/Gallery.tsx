import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import PrimaryButton from "../PrimaryButton";
import GalleryModal from "../GalleryModal";
import ImageModal from "../ImageModal";
import axios from "axios";

export type ImageType = {
  id: number;
  image: string;
};

const Gallery = () => {
  const [arrayOfImages, setArrOfImages] = useState<ImageType[] | []>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalBottomLeft, setShowModalBottomLeft] = useState({
    show: false,
    imgIndex: 0,
  });

  useEffect(() => {
    const getImages = async () => {
      const res = await axios.get(
        "https://senorita.besoftware.net/api/images/get-all-images"
      );
      const images = res.data;
      setArrOfImages(images);
    };

    getImages();
  }, []);

  return (
    <section className="my-14 mt-5" id="gallery">
      <div className="special-word !mb-10" data-aos="fade-up">
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
          pagination={{ clickable: true, dynamicBullets: true }}
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
              key={img.id}
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
                  src={`data:image/jpeg;base64,${img.image}`}
                  alt="image"
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
          setShowModalBottomLeft={() =>
            setShowModalBottomLeft({
              ...showModalBottomLeft,
              show: !showModalBottomLeft,
            })
          }
          showModalBottomLeft={showModalBottomLeft}
          img={arrayOfImages[showModalBottomLeft.imgIndex]}
        />

        {/* <!--Bottom left modal--> */}
      </div>
    </section>
  );
};

export default Gallery;

