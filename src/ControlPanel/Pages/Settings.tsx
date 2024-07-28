import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import { editPassword, editPhone } from '../api-client';

const Settings = (): React.ReactElement => {
  const [phonePass, setPhonePass] = useState<string>('');
  const [phonePho, setPhonePho] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneLoading, setPhoneLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  const { showToast } = useAppContext()
  const translating = useTranslation("global")[0];

  const resetValue = () => {
    setPhonePass('');
    setPhonePho('');
    setOldPassword('');
    setNewPassword('');
    setNewPhone('');
    setPassword('');
  };

  const editPasswordMutation = useMutation(editPassword, {
    onMutate: () => {
      setPhoneLoading(true);
      setPasswordLoading(true);
    },
    onSuccess: async () => {
      showToast({ message: translating("settings.edit.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("settings.edit.error"), type: "ERROR" })
    },
    onSettled: () => {
      setPhoneLoading(false)
      setPasswordLoading(false)
      resetValue()
    }
  })

  const editPhoneMutation = useMutation(editPhone, {
    onMutate: () => {
      setPhoneLoading(true);
      setPasswordLoading(true);
    },
    onSuccess: async () => {
      showToast({ message: translating("settings.edit.success"), type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: translating("settings.edit.error"), type: "ERROR" })
    },
    onSettled: () => {
      setPhoneLoading(false)
      setPasswordLoading(false)
      resetValue()
    }
  })

  const handlePhoneSubmit = () => {
    if (!phonePho || !password || !newPhone)
      return showToast({ message: translating("settings.complete"), type: "ERROR" })

    const data = { phone: phonePho, password, newPhone }
    editPhoneMutation.mutate(data)
  };

  const handlePasswordSubmit = () => {
    if (!phonePass || !oldPassword || !newPassword)
      return showToast({ message: translating("settings.complete"), type: "ERROR" })

    const data = { phone: phonePass, password: oldPassword, newPassword }
    editPasswordMutation.mutate(data)
  };

  return (
    <div className="flex justify-center items-center overflow-hidden h-[88vh]">
      <div className="p-4 bg-gray-100 rounded-lg shadow-md md:w-[500px]">
        <div className="text-center">
          <h4 className="text-2xl font-bold my-4">{translating("settings.title")}</h4>
        </div>
        <div className="flex items-center flex-col md:flex-row md:gap-4">
          <div className="my-4 md:w-1/2">
            <div className="mb-4">
              <h2 className="text-lg mb-2 font-bold text-center">{translating('settings.editPhone')}</h2>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                style={{ direction: 'rtl' }}
                placeholder={translating('settings.oldPhoneNumber')}
                value={phonePho}
                onChange={(event) => setPhonePho(event.target.value)}
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder={translating('settings.oldPassword')}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                style={{ direction: 'rtl' }}
                placeholder={translating('settings.newPhoneNumber')}
                value={newPhone}
                onChange={(event) => setNewPhone(event.target.value)}
              />
              <button
                className={`w-full p-2 bg-blue-500 text-white rounded mt-2 ${phoneLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                onClick={handlePhoneSubmit}
                disabled={phoneLoading}
              >
                {phoneLoading ? `...${translating('settings.loading')}` : translating("settings.submit")}
              </button>
            </div>
          </div>
          <hr className="my-4 border-gray-300 md:hidden" />
          <div className="mb-4 md:w-1/2">
            <h2 className="text-lg mb-2 font-bold text-center" style={{ direction: 'ltr' }}>{translating('settings.editPassword')}</h2>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={translating('settings.oldPassword')}
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder={translating('settings.newPassword')}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder={translating('settings.phone')}
              value={phonePass}
              onChange={(event) => setPhonePass(event.target.value)}
            />
            <button
              className={`w-full p-2 bg-blue-500 text-white rounded mt-2 ${passwordLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              onClick={handlePasswordSubmit}
              disabled={passwordLoading}
            >
              {passwordLoading ? `...${translating('settings.loading')}` : translating("settings.submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;