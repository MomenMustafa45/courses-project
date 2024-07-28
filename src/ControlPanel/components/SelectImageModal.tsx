import React from 'react';
import { useMutation } from 'react-query';
import { uploadImage } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import { useTranslation } from 'react-i18next';

interface Props {
  onClose: () => void;
  getAllImages: () => Promise<void>;
  selectedImages: File[],
  imagePreviews: string[]
}

const SelectImageModal = ({ onClose, getAllImages, selectedImages, imagePreviews }: Props): React.JSX.Element => {
  const translating = useTranslation("global")[0];
  const { showToast } = useAppContext();

  const mutation = useMutation(uploadImage, {
    onSuccess: async () => {
      showToast({ message: translating("gallery.add.success"), type: "SUCCESS" });
      await getAllImages();
      onClose();
    },
    onError: () => {
      showToast({ message: translating("gallery.add.error"), type: "ERROR" });
    },
  });

  const handleSubmit = () => {
    if (selectedImages.length === 0) return;

    const formData = new FormData();

    selectedImages.forEach((image: File) => {
      formData.append(`images`, image as Blob);
    });

    mutation.mutate(formData);
  };

  const additionalImagesCount = selectedImages.length > 1 ? selectedImages.length - 1 : 0;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-screen-lg mx-auto relative">
        <button
          className="absolute top-[-20px] right-[0] bg-blue-500 text-white text-3xl w-10 h-10 rounded-full transition duration-300 ease-in-out hover:bg-blue-700"
          onClick={onClose}
        >
          X
        </button>
        {selectedImages.length > 0 && (
          <>
            <div className="relative">
              {additionalImagesCount > 0 && (
                <div className="absolute top-2 right-2 bg-black text-white rounded-full px-2 py-1 text-sm">
                  +{additionalImagesCount} {translating("gallery.more")}
                </div>
              )}
              <img
                src={imagePreviews[0]}
                alt="Selected Image"
                className="w-full object-cover border border-gray-300 max-h-80" />
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md">
              {translating("gallery.submit")}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectImageModal;