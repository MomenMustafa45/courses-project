import { useState } from "react";
import { useAppDispatch } from "../hooks/dispatchHooks";
import { toggleModal } from "../store/slices/modalSlice";
import PrimaryButton from "./PrimaryButton";

interface CourseCardProps {
  cardTitle: string;
  cardDescription: string;
  cardDirection: string;
  img: string;
  btnTitle: string;
}

const CourseCard = ({
  img,
  cardTitle,
  cardDescription,
  cardDirection,
  btnTitle,
}: CourseCardProps) => {
  const dispatch = useAppDispatch();
  const [showAllDesc, setShowAllDesc] = useState(false);

  return (
    <div>
      {/* card */}
      <div
        data-aos={cardDirection == "left" ? "fade-left" : "fade-right"}
        className={`flex gap-6 flex-col md:mx-auto 
            ${cardDirection == "left" ? "md:flex-row" : "md:flex-row-reverse"}
         shadow-md rounded overflow-hidden mb-16`}
      >
        {/* card texts */}
        <div className="flex-[3] flex flex-col justify-center order-2 md:order-1 px-5 py-3">
          <h3 className="font-bold text-xl md:text-3xl lg:text-4xl">
            {cardTitle}
          </h3>
          <p
            className={`text-sm mt-3 md:text-base lg:my-5 lg:text-lg ${
              showAllDesc ? "" : "line-clamp-4 md:line-clamp-3"
            } transition-all`}
          >
            {cardDescription}
          </p>
          <p
            className="mb-3 -mt-4 font-bold cursor-pointer"
            onClick={() => setShowAllDesc(!showAllDesc)}
          >
            اقرا المزيد{" "}
          </p>
          <div>
            <PrimaryButton
              classes="bg-pink-default hover:bg-pink-400"
              onClickHandler={() => {
                dispatch(toggleModal());
              }}
            >
              {btnTitle}
            </PrimaryButton>
          </div>
        </div>
        {/* image */}
        <div className="   flex-[2] order-1 md:order-2">
          <div className=" h-full w-full">
            <img src={img} className="h-full w-full max-h-[262px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
