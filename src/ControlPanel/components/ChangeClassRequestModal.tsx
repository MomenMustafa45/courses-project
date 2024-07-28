import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { changeClassRequest } from '../api-client';

interface Props {
  onClose: () => void;
  classes: { name: string; id: number }[];
  getData: () => Promise<void>
  requestIds: number[]
}

const ChangeClassRequestModal: React.FC<Props> = ({ onClose, requestIds, classes, getData }) => {
  const [selectedClass, setSelectedClass] = useState<number | undefined>(undefined);

  const { showToast } = useAppContext();
  const translating = useTranslation("global")[0]

  const editMutation = useMutation(changeClassRequest, {
    onSuccess: async () => {
      showToast({ message: translating("requests.edit.success"), type: "SUCCESS" });
      await getData();
      onClose()
    },
    onError: () => {
      showToast({ message: translating("requests.edit.error"), type: "ERROR" });
    },
  });

  const handleEdit = () => {
    if (!selectedClass)
      return

    const data = { requestIds, id: selectedClass }
    editMutation.mutate(data)
  }

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClassId = parseInt(e.target.value);
    setSelectedClass(selectedClassId);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white relative rounded-lg shadow-lg p-6 w-full sm:w-96">
        <button
          className="absolute top-[-15px] right-[0] flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-lg font-bold mb-4 text-blue-500 text-center">{translating("requests.select")}</h2>
        <select
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={selectedClass || ""}
          onChange={handleClassChange}
        >
          <option value="">{translating("requests.classes")}</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-700"
          onClick={handleEdit}
        >
          {translating("requests.edit-class")}
        </button>
      </div>
    </div>
  );
};

export default ChangeClassRequestModal;