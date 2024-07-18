import { useState } from "react";
import CheckBoxCourse from "./CheckBoxCourse";
import PrimaryButton from "./PrimaryButton";

const MenuCheckBox = () => {
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);

  return (
    <div className="relative w-full ">
      <PrimaryButton
        classes="text-black  border-2"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClickHandler={(e: any) => {
          setShowCoursesMenu((prev: boolean) => !prev);
          e.preventDefault();
        }}
      >
        Show
      </PrimaryButton>
      <div
        className={` relative w-full ${
          showCoursesMenu ? "h-[150px] py-1" : "h-0 py-0"
        } bg-pink-default overflow-y-scroll flex flex-col transition-all no-scrollbar shadow rounded mt-4`}
      >
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
        <CheckBoxCourse />
      </div>
    </div>
  );
};

export default MenuCheckBox;
