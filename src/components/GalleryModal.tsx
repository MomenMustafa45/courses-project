import {
  TEModal,
  TEModalBody,
  TEModalContent,
  TEModalDialog,
  TEModalHeader,
} from "tw-elements-react";
import ImageModal from "./ImageModal";
import { useState } from "react";
import { imageType } from "../ControlPanel/misc/types";

type GalleryModalProps = {
  showModal: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setShowModal: any;
  arrayOfImages: imageType[];
};

const GalleryModal = ({
  showModal,
  setShowModal,
  arrayOfImages,
}: GalleryModalProps) => {
  const [showModalBottomLeft, setShowModalBottomLeft] = useState({
    show: false,
    imgIndex: 0,
  });
  return (
    <>
      {/* Modal */}
      <TEModal show={showModal} setShow={setShowModal} className="">
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                الصور
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <div className="h-[400px] overflow-y-scroll flex flex-wrap justify-between gap-y-4">
                {arrayOfImages.map((img, index) => {
                  return (
                    <div
                      className="w-[48%]"
                      key={img.id}
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
                        alt="img"
                        className="w-full h-full rounded"
                      />
                    </div>
                  );
                })}
              </div>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
      {/* Modal */}
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
    </>
  );
};

export default GalleryModal;

