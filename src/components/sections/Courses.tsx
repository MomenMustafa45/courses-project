import CourseCard from "../CourseCard";
import arabicCourses from "../../../public/translation/arabic/courses.json";
import hebrewCourses from "../../../public/translation/hebraw/courses.json";
import { useLanguage } from "../../hooks/useLang";
import courseImgOne from "../../assets/images/courseImg1.png";
import courseImgTwo from "../../assets/images/courseImg2.png";
import courseImgThree from "../../assets/images/courseImg3.png";

const images = [courseImgOne, courseImgTwo, courseImgThree];

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
    <section className="my-20 mb-[1.5rem]" id="courses">
      <div className="container">
        <div className="special-word !mb-10" data-aos="fade-down">
          <h1 className="h1-special text-[50px] md:text-[100px]">الكورسات</h1>
          <p className="p-special">الكورسات</p>
        </div>
        {/* cards */}
        {lang.map((course, index) => {
          return (
            <CourseCard
              key={course.id}
              cardTitle={course.title}
              cardDescription={course.description}
              cardDirection={index % 2 == 0 ? "left" : "right"}
              img={images[index]}
              btnTitle={course.btnTitle}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Courses;
