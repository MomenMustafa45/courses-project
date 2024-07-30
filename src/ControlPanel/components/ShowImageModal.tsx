import React from 'react'
import { BsX, BsTrash } from 'react-icons/bs';
import { imageType } from '../misc/types';

interface Props {
  closeModal: () => void
  deleteImageFromGallery: (id: number) => void
  selectedImage: imageType
}

const ShowImageModal = ({ closeModal, deleteImageFromGallery, selectedImage }: Props): React.JSX.Element => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white border-4 border-white p-4 md:w-500 w-full max-w-screen-lg relative">
        <button onClick={closeModal} className="absolute top-[-30px] right-2 bg-blue-500 text-white p-2 rounded-full z-20">
          <BsX size={24} />
        </button>
        <img src={`data:image/jpeg;base64,${selectedImage.image}`} alt="Selected Image" className="w-full max-h-[500px] h-auto" />
        <div className="absolute bottom-[-25px] right-1">
          <button className="flex items-center justify-center bg-red-500 rounded-full p-2">
            <BsTrash size={24} color="white" onClick={() => deleteImageFromGallery(selectedImage.id)} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowImageModal
