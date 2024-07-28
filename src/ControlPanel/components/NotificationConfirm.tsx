import React from 'react'
import { useTranslation } from 'react-i18next';

interface Props {
  msg: string;
  cancelDelete: () => void;
  confirmDelete: () => void
}

const NotificationConfirm = ({ msg, cancelDelete, confirmDelete }: Props): React.JSX.Element => {
  const translating = useTranslation("global")[0];

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full relative">
        <p>{translating('notification-confirm.delete-msg')} {msg} ؟</p>
        <div className="flex justify-start mt-4 gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={cancelDelete}>
            {translating('notification-confirm.cancel')}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={confirmDelete}>
            {translating('notification-confirm.delete')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationConfirm
