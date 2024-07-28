import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from '../components/Loading';
import { classType } from '../misc/types';
import { deleteClass, getClasses } from '../api-client';
import { IoMdTrash, IoMdCreate, IoMdPeople } from 'react-icons/io';
import { FaPlus } from "react-icons/fa";
import AddClassModal from '../components/AddClassModal';
import { useMutation } from 'react-query';
import { useAppContext } from '../context/AppProvider';
import NotificationConfirm from '../components/NotificationConfirm';

const Classes = (): React.JSX.Element => {
  const [classes, setClasses] = useState<classType[]>([]);
  const [selectedClass, setSelectedClass] = useState<classType | null>(null)
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trashedClass, setTrashedClass] = useState<classType | null>(null)

  const { showToast } = useAppContext()
  const translating = useTranslation("global")[0];

  const deleteMutation = useMutation(deleteClass, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      showToast({ message: translating("classes.delete.success"), type: "SUCCESS" })
      await getAllClasses()
    },
    onError: () => {
      showToast({ message: translating("classes.delete.error"), type: "ERROR" })
    },
    onSettled: () => setIsLoading(false)
  });

  const getAllClasses = async () => {
    setIsLoading(true);
    const data = await getClasses();
    setClasses(data);
    setIsLoading(false);
  };

  const handleDelete = (Class: classType) => {
    deleteMutation.mutate(Class.id);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 xl:px-0 px-2 pb-[50px]">
      {classes.length ? (
        classes.map((classItem) => (
          <div key={classItem.id} className="rounded-lg shadow-md bg-white p-4 relative">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-gray-500">{classItem.name}</h5>
              </div>
              <div className="flex items-center">
                <IoMdPeople className="h-5 w-5 ml-2 text-gray-500" />
                <p className="text-sm text-gray-500">{translating("classes.students")}: {classItem.studentsNumber}</p>
              </div>
              <div className="flex gap-1">
                <button
                  className="bg-red-500 text-white rounded-md p-1 mr-2 hover:bg-red-600"
                  onClick={() => setTrashedClass(classItem)}>
                  <IoMdTrash className='text-sm' />
                </button>
                <button className="bg-orange-500 text-white rounded-md p-1 hover:bg-orange-600">
                  <IoMdCreate className='text-sm' onClick={() => {
                    setSelectedClass(classItem)
                    setShowAddModal(true)
                  }} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-[100vw] h-[20vh] mx-auto my-3">
          <p className="text-center text-gray-500 text-3xl">{translating("classes.empty")}</p>
        </div>
      )}

      {showAddModal && (
        <AddClassModal
          selectedClass={selectedClass}
          onClose={() => {
            setShowAddModal(false)
            setSelectedClass(null)
          }}
          getData={getAllClasses}
        />
      )}

      {trashedClass && (
        <NotificationConfirm
          msg={trashedClass.name}
          cancelDelete={() => setTrashedClass(null)}
          confirmDelete={() => {
            handleDelete(trashedClass)
            setTrashedClass(null)
          }}
        />
      )}

      <button
        className="fixed bottom-[8px] right-[8px] bg-blue-500 flex items-center justify-center text-white text-3xl w-[50px] h-[50px] rounded-full transition duration-300 ease-in-out hover:bg-blue-700"
        onClick={() => setShowAddModal(true)}
      ><FaPlus size={18} /></button>

    </div>
  );
};

export default Classes;