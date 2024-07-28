import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { createClass, editClass } from '../api-client';
import { classType } from '../misc/types';

interface Props {
  onClose: () => void,
  getData: () => Promise<void>,
  selectedClass: classType | null
}

const AddClassModal = ({ onClose, getData, selectedClass }: Props): React.JSX.Element => {
  const [newClassName, setNewClassName] = useState<string>('');

  const translating = useTranslation("global")[0];
  const { showToast } = useAppContext()

  const createMutation = useMutation(createClass, {
    onSuccess: async () => {
      showToast({ message: translating("classes.add.success"), type: "SUCCESS" })
      await getData()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("classes.add.error"), type: "ERROR" })
    },
  })

  const editMutation = useMutation(editClass, {
    onSuccess: async () => {
      showToast({ message: translating("classes.edit.success"), type: "SUCCESS" })
      await getData()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("classes.edit.error"), type: "ERROR" })
    },
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }

    setNewClassName(newValue);
  };

  const handleEditClass = () => {
    if (!selectedClass)
      return

    const form = { data: { name: newClassName }, id: selectedClass.id }
    editMutation.mutate(form)
    setNewClassName('');
  }

  const handleAddClass = () => {
    const data = { name: newClassName }
    createMutation.mutate(data)
    setNewClassName('');
  };

  const handleSubmit = () => {
    if (selectedClass)
      return handleEditClass()
    handleAddClass()
  }

  useEffect(() => {
    if (selectedClass)
      setNewClassName(selectedClass.name)
  }, [selectedClass])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="bg-white relative p-4 rounded-lg w-80">
        <button className="absolute top-[-1px] right-[-1px] bg-blue-500 text-white rounded-full p-1 -mt-3 -mr-3" onClick={onClose}>
          <IoMdClose className="text-lg" />
        </button>
        <h2 className="text-xl text-center font-bold text-blue-500">{translating("classes.add-title")}</h2>
        <input
          type="text"
          placeholder={translating("classes.class-name-input")}
          value={newClassName}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mt-2 w-full focus:outline-none focus:border-blue-500 rounded-sm"
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2 w-full rounded hover:bg-blue-700"
          onClick={handleSubmit}>
          {
            selectedClass
              ? translating("classes.edit-button")
              : translating("classes.add-button")
          }
        </button>
      </div>
    </div>
  )
}

export default AddClassModal
