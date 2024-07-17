import CourseCard from "../CourseCard";
import arabicCourses from "../../../public/translation/arabic/courses.json";
import hebrewCourses from "../../../public/translation/hebraw/courses.json";
import { useLanguage } from "../../hooks/useLang";

type CourseType = {
  id: number;
  courseName: string;
  title: string;
  description: string;
  image: string;
  btnTitle: string;
};

const Courses = () => {
  const lang: CourseType[] = useLanguage(arabicCourses, hebrewCourses);

  return (
    <section className="my-40 " id="courses">
      <div className="container">
        {/* cards */}
        {lang.map((course, index) => {
          return (
            <CourseCard
              key={course.id}
              cardTitle={course.title}
              cardDescription={course.description}
              cardDirection={index % 2 == 0 ? "left" : "right"}
              img={course.image}
              btnTitle={course.btnTitle}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Courses;
