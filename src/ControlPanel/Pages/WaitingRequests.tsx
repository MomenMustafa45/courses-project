import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { deleteWaitingRequests, getClasses, getWaitingRequests } from '../api-client';
import { classType, waitingRequests } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { BsTrash, BsCheck } from 'react-icons/bs';
import { IoMdSearch } from 'react-icons/io';
import "../styles/table.css"
import { useMutation } from 'react-query';
import { useAppContext } from '../context/AppProvider';
import "../styles/RequestsButtons.css"
import AddRequestModal from '../components/AddRequestModal';
import { searchText } from '../misc/helpers';

const WaitingRequests = (): React.JSX.Element => {
  const [requests, setRequests] = useState<waitingRequests[]>([]);
  const [classes, setClasses] = useState<classType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRequestIds, setSelectedRequestIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("")

  const filterRequests = requests.filter(request =>
    searchText(search, request.fullName) ||
    searchText(search, request.phone) ||
    request.courses.some(course =>
      searchText(search, course.ar) ||
      searchText(search, course.he))
  );

  const { showToast } = useAppContext()
  const [translating, i18n] = useTranslation("global")

  const deleteMutation = useMutation(deleteWaitingRequests, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      showToast({ message: translating("waiting-requests.delete.success"), type: "SUCCESS" })
      await getAllWaitingRequests()
    },
    onError: () => {
      showToast({ message: translating("waiting-requests.delete.error"), type: "ERROR" })
    },
    onSettled: () => setIsLoading(false)
  })

  const getAllClasses = async () => {
    setIsLoading(true);
    const data = await getClasses();
    setClasses(data);
    setIsLoading(false);
  }

  const getAllWaitingRequests = async () => {
    setIsLoading(true);
    const data = await getWaitingRequests();
    setRequests(data);
    setIsLoading(false);
  };

  const handleCheckboxChange = (requestId: number) => {
    setSelectedRequestIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(requestId)) {
        return prevSelectedIds.filter((id) => id !== requestId);
      } else {
        return [...prevSelectedIds, requestId];
      }
    });
  };

  useEffect(() => {
    getAllWaitingRequests();
    getAllClasses()
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoMdSearch className="text-gray-400" />
          </div>
        </div>
      </div>

      {filterRequests.length ? (
        <div className="max-h-[89.5vh]">
          <div className='overflow-auto window max-h-[75.5vh]'>
            <table className="text-right min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">{translating("waiting-requests.table.id")}</th>
                  <th className="px-4 py-2">{translating("waiting-requests.table.name")}</th>
                  <th className="px-4 py-2">{translating("waiting-requests.table.phone")}</th>
                  <th className="px-4 py-2">{translating("waiting-requests.table.notes")}</th>
                  <th className="px-4 py-2">{translating("waiting-requests.table.course")}</th>
                </tr>
              </thead>
              <tbody>
                {filterRequests.map((request) => (
                  <tr key={request.id} className="border whitespace-nowrap">
                    <td className="px-4 py-2 flex gap-2 align-baseline font-bold text-blue-700">
                      <input
                        type="checkbox"
                        className="mr-2 align-text-bottom"
                        onChange={() => handleCheckboxChange(request.id)}
                        checked={selectedRequestIds.includes(request.id)}
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{request.fullName}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span
                        className="cursor-pointer text-blue-700 hover:text-blue-600"
                        onClick={() => window.open(`tel:${request.phone}`)}
                      >
                        {request.phone}
                      </span>
                    </td>
                    <td className="px-4 py-2">{request.notes}</td>
                    <td className="px-4 py-2">{request.courses.map((course) => i18n.language === "ar" ? course.ar : course.he).join(' | ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-[100vw] h-[20vh] mx-auto my-3">
          <p className="text-center text-gray-500 text-3xl">{translating("waiting-requests.empty")}</p>
        </div>
      )}

      <button
        className={`appear float right bg-blue-500 hover:bg-blue-700 ${selectedRequestIds.length && "active"}`}
        onClick={() => setShowModal(true)}
      ><BsCheck /></button>

      <button
        className={`appear float left bg-red-500 hover:bg-red-700 ${selectedRequestIds.length && "active"}`}
        onClick={() => {
          deleteMutation.mutate(selectedRequestIds)
          setSelectedRequestIds([])
        }}
      >< BsTrash /></button>

      {showModal && (
        <AddRequestModal
          onClose={() => {
            setShowModal(false)
            setSelectedRequestIds([])
          }}
          classes={classes}
          selectedRequests={selectedRequestIds}
          getData={getAllWaitingRequests}
        />
      )}

    </div>
  );
};

export default WaitingRequests;