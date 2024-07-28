import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageBox from '../components/LanguageBox';
import { GrLanguage } from "react-icons/gr";
import { useAppContext } from '../context/AppProvider';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api-client';
import { loginData } from '../misc/types';

const Login = (): React.JSX.Element => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { showToast } = useAppContext()
  const translating = useTranslation("global")[0]
  const queryClient = useQueryClient()
  const navigateTo = useNavigate()

  const resetValue = () => {
    setPhone("")
    setPassword("")
  }

  const mutation = useMutation(login, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("login.toast.success"), type: "SUCCESS" })
      resetValue()
      navigateTo("/dashboard")
    },
    onError: () => {
      showToast({ message: translating("login.toast.error"), type: "ERROR" })
    },
    onSettled: () => setIsLoading(false)
  })

  const handleSubmit = (data: loginData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 bg-gray-100 rounded-lg shadow-md md:w-[350px]">
        <div className="text-center">
          <h4 className="text-xl font-bold my-4">{translating("login.component.title")}</h4>
        </div>
        <form className="my-4" onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          handleSubmit({ phone, password });
        }}>
          <div className="mb-4">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={translating('login.component.mobileNumber')}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder={translating('login.component.password')}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            className={`w-full p-2 bg-blue-500 text-white rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? `...${translating('login.component.loading')}` : translating("login.component.title")}
          </button>
        </form>
      </div>
      <div className="fixed top-8 right-8">
        <GrLanguage
          className="cursor-pointer text-black text-xl"
          onClick={() => setVisible(!visible)}
        />
        <div>
          <LanguageBox
            visible={visible}
            onClose={() => setVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;