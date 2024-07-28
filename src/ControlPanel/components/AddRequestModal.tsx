import React, { useState } from 'react';
import { BsX } from 'react-icons/bs';
import { classType } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { createRequests } from '../api-client';

interface Props {
  onClose: () => void;
  classes: classType[];
  getData: () => Promise<void>;
  selectedRequests: number[]
}

const AddRequestModal = ({ onClose, classes, getData, selectedRequests }: Props): React.JSX.Element => {
  const [selectedClass, setSelectedClass] = useState<classType | null>(null); // Ensure selectedClass is of type classType or null

  const { showToast } = useAppContext();
  const translating = useTranslation("global")[0];

  const mutation = useMutation(createRequests, {
    onSuccess: async () => {
      showToast({ message: translating("waiting-requests.add.success"), type: "SUCCESS" });
      await getData();
      onClose();
    },
    onError: () => {
      showToast({ message: translating("waiting-requests.add.error"), type: "ERROR" });
    },
  });

  const handleAdd = () => {
    if (!selectedClass || !selectedRequests.length) return;

    const classId = selectedClass.id;
    const requestIds = selectedRequests
    const data = { classId, requestIds }

    mutation.mutate(data)
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md relative w-[250px]">
        <button
          className="absolute top-[-18px] right-0 bg-blue-500 text-white rounded-full w-[35px] h-[35px] flex items-center justify-center hover:bg-blue-700"
          onClick={onClose}
        >
          <BsX size={35} />
        </button>
        <div className="modal-body">
          <label
            htmlFor="classSelect"
            className="block text-blue-500 text-center font-bold"
          >
            {translating("waiting-requests.modal.select")}
          </label>
          <select
            id="classSelect"
            className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none"
            value={selectedClass ? selectedClass.id : ''}
            onChange={(e) => {
              const selected = classes.find((classItem) => classItem.id === parseInt(e.target.value, 10));
              setSelectedClass(selected || null);
            }}
          >
            <option value="">{translating("waiting-requests.modal.classe")}</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 block mx-auto"
            onClick={handleAdd}
          >
            {translating("waiting-requests.modal.submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRequestModal;