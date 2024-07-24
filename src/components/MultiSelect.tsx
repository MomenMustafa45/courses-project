import { useState } from "react";
import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

interface CourseOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const courseOptions: CourseOption[] = [
  { value: "course1", label: "Course 1", color: "#00B8D9" },
  { value: "course2", label: "Course 2", color: "#0052CC" },
  { value: "course3", label: "Course 3", color: "#5243AA" },
  { value: "course4", label: "Course 4", color: "#FF5630" },
  { value: "course5", label: "Course 5", color: "#FF8B00" },
  { value: "course6", label: "Course 6", color: "#FFC400" },
  { value: "course7", label: "Course 7", color: "#36B37E" },
  { value: "course8", label: "Course 8", color: "#00875A" },
  { value: "course9", label: "Course 9", color: "#253858" },
  { value: "course10", label: "Course 10", color: "#666666" },
];

const animatedComponents = makeAnimated();

type MultiSelectProps = {
  selectedCoursesHandler: (selectedOptions: MultiValue<unknown>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export default function MultiSelect({
  selectedCoursesHandler,
}: MultiSelectProps) {
  const [isValidArr, setIsValidArr] = useState(false);
  const handleSelectChange = (selectedOptions: MultiValue<unknown>) => {
    selectedCoursesHandler(selectedOptions);
    if (selectedOptions.length > 0) {
      setIsValidArr(true);
    } else {
      setIsValidArr(false);
    }
  };

  return (
    <>
      <Select
        className="mt-2"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={courseOptions}
        styles={{
          menuList: () => ({
            height: "200px",
            overflowY: "scroll",
            transition: "0.3s ease-in-out all",
          }),
        }}
        onChange={handleSelectChange}
        placeholder="أختر الكورسات"
      />
      <p>{isValidArr && "يجب ادخال كورس واحد علي الاقل"}</p>
    </>
  );
}
