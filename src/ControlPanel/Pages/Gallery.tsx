import React, { useEffect, useState } from 'react';
import { deleteImage, getImages } from '../api-client';
import { imageType } from '../misc/types';
import styles from "../styles/ControlPanel.module.css";
import Loading from '../components/Loading';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import ShowImageModal from '../components/ShowImageModal';
import SelectImageModal from '../components/SelectImageModal';

const Gallery = (): React.JSX.Element => {
  const [images, setImages] = useState<imageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<imageType | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { showToast } = useAppContext()
  const translating = useTranslation("global")[0]

  const getAllImages = async () => {
    setIsLoading(true)
    const data = await getImages();
    setImages(data);
    setIsLoading(false)
  };

  const mutation = useMutation(deleteImage, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      showToast({ message: translating("gallery.delete.success"), type: "SUCCESS" })
      await getAllImages()
    },
    onError: () => {
      showToast({ message: translating("gallery.delete.error"), type: "ERROR" })
    },
    onSettled: () => setIsLoading(false)
  })

  const deleteImageFromGallery = (id: number) => {
    mutation.mutate(id)
    setSelectedImage(null)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newImages = Array.from(files).slice(0, 5);
      const newPreviews = newImages.map(image => URL.createObjectURL(image));

      setSelectedImages(newImages);
      setImagePreviews(newPreviews);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);


  if (isLoading)
    return <Loading />

  return (
    <div id='gallery' className="grid w-full h-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {images.length
        ? (
          images.map((image) => (
            <div
              key={image.id}
              className={`relative h-[150px] border-gray-500 border border-2 overflow-hidden ${styles.cp_img_container}`}
              onClick={() => setSelectedImage(image)}>
              <img
                src={`data:image/jpeg;base64,${image.image}`}
                alt={`Image ${image.id}`}
                className="w-full h-full object-cover bg-black border border-gray-300 cursor-pointer"
              />
            </div>
          ))
        )
        : (
          <div className="w-[100vw] h-[20vh] mx-auto my-3">
            <p className="text-center text-gray-500 text-3xl">{translating("gallery.empty")}</p>
          </div>
        )
      }

      <div className="fixed bottom-4 right-4">
        <input
          id="img-selection"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="img-selection"
          className="bg-blue-500 text-white text-3xl w-12 h-12 rounded-full flex items-center justify-center transition duration-300 ease-in-out hover:bg-blue-700 cursor-pointer"
        >
          +
        </label>
      </div>

      {selectedImages.length && (
        <SelectImageModal
          getAllImages={getAllImages}
          onClose={() => {
            setSelectedImages([])
            setImagePreviews([])
          }}
          selectedImages={selectedImages}
          imagePreviews={imagePreviews} />
      )}

      {selectedImage && (
        <ShowImageModal
          closeModal={() => setSelectedImage(null)}
          deleteImageFromGallery={deleteImageFromGallery}
          selectedImage={selectedImage}
        />
      )}
    </div>
  );
};

export default Gallery;