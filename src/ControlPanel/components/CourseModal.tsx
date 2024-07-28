import React, { useState } from 'react';
import { courseType } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { deleteCourse } from '../api-client';
import NotificationConfirm from './NotificationConfirm';
import "../styles/scrollbar.css"

interface Props {
  onClose: () => void;
  course: courseType | null;
  onEdit: (data: courseType) => void;
  getData: () => Promise<void>;
}

const CourseModal = ({ onClose, course, onEdit, getData }: Props): React.JSX.Element => {
  const { showToast } = useAppContext();
  const translating = useTranslation('global')[0];
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const deleteMutation = useMutation(deleteCourse, {
    onSuccess: async () => {
      showToast({ message: translating('courses.delete.success'), type: 'SUCCESS' });
      await getData();
      onClose();
    },
    onError: () => {
      showToast({ message: translating('courses.delete.error'), type: 'ERROR' });
    },
  });

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = () => {
    if (!course)
      return
    deleteMutation.mutate(course.id);
    setShowConfirmDialog(false);
  };

  if (!course) return <></>;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full relative">
        <button
          className="absolute flex justify-center top-[-20px] right-[0] bg-blue-500 text-white text-3xl w-10 h-10 rounded-full transition duration-300 ease-in-out hover:bg-blue-700"
          onClick={onClose}
        >
          x
        </button>

        <img src={`data:image/jpeg;base64,${course.image}`} alt={course.arName} className="w-full h-150 object-cover rounded-t p-0 m-0" />

        <div className="flex items-start p-4 relative mb-2">
          <div style={{ flex: 1 }}>
            <h2 className="text-blue-600 font-bold pb-2">{course.arName}</h2>
            <textarea
              className="text-gray-600 resize-none w-full p-0"
              style={{ maxHeight: '200px', overflowY: 'auto', background: 'transparent' }}
              disabled
            >
              {course.arDescription}
            </textarea>
          </div>
          <span className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-300 w-px"></span>
          <div className="mr-[6px]" style={{ flex: 1 }}>
            <h2 className="text-blue-600 font-bold pb-2">{course.heName}</h2>
            <textarea
              className="text-gray-600 resize-none w-full p-0"
              style={{ maxHeight: '200px', overflowY: 'auto', background: 'transparent' }}
              disabled
            >
              {course.heDescription}
            </textarea>
          </div>
        </div>

        <div className="flex justify-start mt-4 gap-4">
          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => onEdit(course)}>
            {translating('courses.view-modal.edit')}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            {translating('courses.view-modal.delete')}
          </button>
        </div>

        {showConfirmDialog && (
          <NotificationConfirm
            cancelDelete={() => setShowConfirmDialog(false)}
            confirmDelete={confirmDelete}
            msg={`${course.arName}/ ${course.heName}`}
          />
        )}
      </div>
    </div>
  );
};

export default CourseModal;