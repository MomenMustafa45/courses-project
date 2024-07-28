import CourseCard from "../CourseCard";
import arabicCourses from "../../../public/translation/arabic/courses.json";
import hebrewCourses from "../../../public/translation/hebraw/courses.json";
import { useLanguage } from "../../hooks/useLang";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHooks";
import { useEffect } from "react";
import { getAllCourses } from "../../store/slices/coursesSlice";

type CourseType = {
  sectionHeader: string;
  data: {
    id: number;
    courseName: string;
    title: string;
    description: string;
    image: string;
    btnTitle: string;
  }[];
};

export type Course = {
  id: number;
  arName: string;
  heName: string;
  arDescription: string;
  heDescription: string;
  image: string;
};

const Courses = () => {
  const lang: CourseType = useLanguage(arabicCourses, hebrewCourses);
  const courses: Course[] = useAppSelector((state) => state.courses.courses);
  const language = useAppSelector((state) => state.lang.value);
  const isArabic = language == "arabic";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="my-8 mb-[1.5rem]" id="courses">
      <div className="container">
        <div className="special-word !mb-10">
          <h1 className="h1-special text-[50px] md:text-[100px]">
            {lang.sectionHeader}
          </h1>
          <p className="p-special">{lang.sectionHeader}</p>
        </div>
        {/* cards */}
        {courses.map((course, index) => {
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              cardTitle={isArabic ? course.arName : course.heName}
              cardDescription={
                isArabic ? course.arDescription : course.heDescription
              }
              cardDirection={index % 2 == 0 ? "left" : "right"}
              img={`data:image/jpeg;base64,${course.image}`}
              btnTitle={isArabic ? "انضم الان" : "הצטרף עכשיו"}
              readMore={isArabic ? "اقرا المزيد" : "קרא עוד"}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Courses;

