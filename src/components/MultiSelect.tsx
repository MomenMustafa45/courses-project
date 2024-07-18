import Select from "react-select";
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

export default function MultiSelect() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[courseOptions[1]]}
      isMulti
      options={courseOptions}
    />
  );
}
