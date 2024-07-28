import Select, { MultiValue } from "react-select";
import makeAnimated from "react-select/animated";
import { useAppSelector } from "../hooks/dispatchHooks";
import { Course } from "./sections/Courses";

const animatedComponents = makeAnimated();

type MultiSelectProps = {
  selectedCoursesHandler: (selectedOptions: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

export default function MultiSelect({
  selectedCoursesHandler,
}: MultiSelectProps) {
  const courses = useAppSelector((state) => state.courses.courses);
  // const [isValidArr, setIsValidArr] = useState(false);

  // onChange function
  const handleSelectChange = (selectedOptions: MultiValue<Course>) => {
    const arrayOfId = selectedOptions.map((course: Course) =>
      course.id.toString()
    );

    selectedCoursesHandler(arrayOfId);
    // if (selectedOptions.length > 0) {
    //   setIsValidArr(true);
    // } else {
    //   setIsValidArr(false);
    // }
  };

  return (
    <>
      <Select
        className="mt-2"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={courses}
        styles={{
          menuList: () => ({
            height: "200px",
            overflowY: "scroll",
            transition: "0.3s ease-in-out all",
          }),
        }}
        onChange={handleSelectChange}
        placeholder="أختر الكورسات"
        getOptionLabel={(item: Course) => item.arName}
        getOptionValue={(item: Course) => `${item.id}`}
      />
      {/* <p>{isValidArr && "يجب ادخال كورس واحد علي الاقل"}</p> */}
      {/* <p>"يجب ادخال كورس واحد علي الاقل"</p> */}
    </>
  );
}

