import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { createCourse, editCourse } from '../api-client';
import { courseType } from '../misc/types';

interface Props {
  onClose: () => void;
  getData: () => Promise<void>
  selectedCourse: courseType | null
}

const AddCourseModal = ({ onClose, getData, selectedCourse }: Props): React.JSX.Element => {
  const [arabicName, setArabicName] = useState<string>('');
  const [hebrewName, setHebrewName] = useState<string>('');
  const [arabicDescription, setArabicDescription] = useState<string>('');
  const [hebrewDescription, setHebrewDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const translating = useTranslation("global")[0];
  const { showToast } = useAppContext()

  const createMutation = useMutation(createCourse, {
    onSuccess: async () => {
      showToast({ message: translating("courses.add.success"), type: "SUCCESS" })
      await getData()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("courses.add.error"), type: "ERROR" })
    },
  })

  const editMutation = useMutation(editCourse, {
    onSuccess: async () => {
      showToast({ message: translating("courses.edit.success"), type: "SUCCESS" })
      await getData()
      onClose()
    },
    onError: () => {
      showToast({ message: translating("courses.edit.error"), type: "ERROR" })
    },
  })

  const handleEditCourse = async () => {
    if (!selectedCourse)
      return

    const formData = new FormData();

    formData.append('heName', hebrewName);
    formData.append('arName', arabicName);
    formData.append('heDescription', hebrewDescription);
    formData.append('arDescription', arabicDescription);

    if (image)
      formData.append('image', image as Blob);

    editMutation.mutate({ data: formData, id: selectedCourse.id })
  }

  const handleAddCourse = async () => {
    if (!image)
      return

    const formData = new FormData();

    formData.append('heName', hebrewName);
    formData.append('arName', arabicName);
    formData.append('heDescription', hebrewDescription);
    formData.append('arDescription', arabicDescription);
    formData.append('image', image as Blob);
    createMutation.mutate(formData)
  }

  const handelConfirm = () => {
    if (selectedCourse)
      return handleEditCourse()

    handleAddCourse()
  }

  const handleArabicNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue.length > 20) {
      inputValue = inputValue.slice(0, 20);
    }
    setArabicName(inputValue);
  };

  const handleHebrewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue.length > 20) {
      inputValue = inputValue.slice(0, 20);
    }
    setHebrewName(inputValue);
  };

  const handleArabicDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArabicDescription(e.target.value);
  };

  const handleHebrewDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHebrewDescription(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  useEffect(() => {
    console.log("enter")
    if (selectedCourse) {
      setArabicName(selectedCourse.arName)
      setHebrewName(selectedCourse.heName)
      setArabicDescription(selectedCourse.arDescription)
      setHebrewDescription(selectedCourse.heDescription)
    }
  }, [selectedCourse])

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full relative">
        <button className="absolute top-[-15px] right-[2px] bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600" onClick={onClose}>
          <AiOutlineClose size={24} />
        </button>

        <div className="mb-4">
          <label htmlFor="arabicName" className="text-sm font-medium text-gray-700 w-1/4 font-semibold">
            {translating("courses.form.ar-name")}:
          </label>
          <input
            type="text"
            id="arabicName"
            value={arabicName}
            onChange={handleArabicNameChange}
            className="mt-1 block w-3/4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hebrewName" className="text-sm font-medium text-gray-700 w-1/4 font-semibold">
            {translating("courses.form.he-name")}:
          </label>
          <input
            type="text"
            id="hebrewName"
            value={hebrewName}
            onChange={handleHebrewNameChange}
            className="mt-1 block w-3/4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ar-description" className="block text-sm font-medium text-gray-700 font-semibold">
            {translating("courses.form.ar-description")}:
          </label>
          <textarea
            id="ar-description"
            value={arabicDescription}
            onChange={handleArabicDescriptionChange}
            className="mt-1 block w-full h-[125px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none p-2"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="he-description" className="block text-sm font-medium text-gray-700 font-semibold">
            {translating("courses.form.he-description")}:
          </label>
          <textarea
            id="he-description"
            value={hebrewDescription}
            onChange={handleHebrewDescriptionChange}
            className="mt-1 block w-full h-[125px] border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none p-2"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 font-semibold">
            {translating("courses.form.upload-image")}:
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
            {imageUrl && (
              <div className="ml-4 border border-black rounded-md">
                <img src={imageUrl} alt="Selected" className="w-[200px] h-[100px] object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handelConfirm}
          >
            {selectedCourse ? translating("courses.form.edit") : translating("courses.form.confirm")}
          </button>
          <button
            className="text-gray-700 px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            {translating("courses.form.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;