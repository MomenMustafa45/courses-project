import React, { useEffect, useState } from 'react';
import { courseType } from '../misc/types';
import Loading from '../components/Loading';
import { getCourses } from '../api-client';
import { useTranslation } from 'react-i18next';
import { formatText } from '../misc/helpers';
import CourseModal from '../components/CourseModal';
import { FaPlus } from "react-icons/fa";
import AddCourseModal from '../components/AddCourseModal';

const Courses = (): React.JSX.Element => {
  const [courses, setCourses] = useState<courseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<courseType | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [selectedEditCourse, setSelectedEditCourse] = useState<courseType | null>(null)

  const translating = useTranslation("global")[0];

  const getAllCourses = async () => {
    setIsLoading(true);
    const data = await getCourses();
    setCourses(data.courses);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.length ? (
        courses.map((course) => (
          <div key={course.id} className="border rounded shadow relative mx-2 md:mx-0">
            <img src={`data:image/jpeg;base64,${course.image}`} alt={course.arName} className="w-full h-[280px] object-cover rounded-t p-0 m-0" />

            <div className="p-4">
              <h2 className="text-blue-600 font-bold pb-2">{course.arName}</h2>
              <p className="text-gray-600 truncate">{formatText(course.arDescription, 75)}</p>
            </div>

            <div className="p-4">
              <h2 className="text-blue-600 font-bold pb-2">{course.heName}</h2>
              <p className="text-gray-600 truncate">{formatText(course.heDescription, 75)}</p>
            </div>

            <button className="block mx-auto bottom-0 mb-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setSelectedCourse(course)}
            >
              <p className="text-sm">{translating("courses.info")}</p>
            </button>
          </div>
        ))
      ) : (
        <div className="w-[100vw] h-[20vh] mx-auto my-3">
          <p className="text-center text-gray-500 text-3xl">{translating("courses.empty")}</p>
        </div>
      )}

      <button
        className="fixed bottom-[8px] right-[8px] bg-blue-500 flex items-center justify-center text-white text-3xl w-[50px] h-[50px] rounded-full transition duration-300 ease-in-out hover:bg-blue-700"
        onClick={() => setShowAddModal(true)}
      ><FaPlus size={18} /></button>

      {showAddModal && (
        <AddCourseModal
          onClose={() => {
            setShowAddModal(false)
            setSelectedEditCourse(null)
          }}
          getData={getAllCourses}
          selectedCourse={selectedEditCourse}
        />
      )}

      {selectedCourse &&
        <CourseModal
          onClose={() => setSelectedCourse(null)}
          course={selectedCourse}
          onEdit={(data: courseType) => {
            setSelectedEditCourse(data)
            setSelectedCourse(null)
            setShowAddModal(true)
          }}
          getData={getAllCourses}
        />
      }

    </div>
  );
};

export default Courses;