import React, { useEffect, useState } from 'react';
import { classType, requestsType } from '../misc/types';
import Loading from '../components/Loading';
import { deleteRequests, getClasses, getRequests } from '../api-client';
import { useTranslation } from 'react-i18next';
import "../styles/table.css";
import "../styles/RequestsButtons.css";
import { BsTrash, BsPencil } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../context/AppProvider';
import { useMutation } from 'react-query';
import ChangeClassRequestModal from '../components/ChangeClassRequestModal';
import { searchText } from '../misc/helpers';


const WaitingRequests = (): React.JSX.Element => {
  const [requests, setRequests] = useState<requestsType[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [classesIdentity, setClassesIdentity] = useState<{ name: string, id: number }[]>([])
  const [selectedRequestIds, setSelectedRequestIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string | null>("");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState<string>("")

  const { showToast } = useAppContext();
  const [translating, i18n] = useTranslation("global")

  const deleteMutation = useMutation(deleteRequests, {
    onMutate: () => setIsLoading(true),
    onSuccess: async () => {
      showToast({ message: translating("requests.delete.success"), type: "SUCCESS" });
      await getAllRequests();
    },
    onError: () => {
      showToast({ message: translating("requests.delete.error"), type: "ERROR" });
    },
    onSettled: () => setIsLoading(false)
  });


  const filterRequests = requests.filter(request =>
    (searchText(search, request.fullName) ||
      searchText(search, request.phone)) &&
    (!selectedClass || request.className === selectedClass)
  )
  // const filterRequests = requests.filter(request =>
  //   (!selectedClass || request.className === selectedClass)
  // );

  const getAllRequests = async () => {
    setIsLoading(true);
    const data = await getRequests();
    setRequests(data);
    getClassesDetails();
    setIsLoading(false);
  };

  const getClassesDetails = async () => {
    const data: classType[] = await getClasses();

    const dataNames = data.map(item => item.name);
    const dataIdentity = data.map(item => ({ name: item.name, id: item.id }));

    setClasses(dataNames);
    setClassesIdentity(dataIdentity);
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
    getAllRequests();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between flex-row-reverse items-center py-2 px-6 my-4 gap-2">
        <div className="window flex flex-row-reverse items-center gap-2 overflow-x-auto">
          <button
            className={`px-4 py-2 whitespace-nowrap rounded-full cursor-pointer ${selectedClass === "" ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setSelectedClass("")}
          >
            {translating("requests.all")}
          </button>
          {classes.map((className) => (
            <button
              key={className}
              className={`px-4 py-2 whitespace-nowrap rounded-full cursor-pointer ${selectedClass === className ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
              onClick={() => setSelectedClass(className)}
            >
              {className}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-full w-full md:w-[300px] w-[150px] focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {filterRequests.length ? (
        <div className="max-h-[89.5vh]">
          <div className='overflow-auto window max-h-[72.5vh]'>
            <table className="text-right min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">{translating("requests.table.id")}</th>
                  <th className="px-4 py-2">{translating("requests.table.name")}</th>
                  <th className="px-4 py-2">{translating("requests.table.phone")}</th>
                  <th className="px-4 py-2">{translating("requests.table.notes")}</th>
                  <th className="px-4 py-2">{translating("requests.table.class")}</th>
                  <th className="px-4 py-2">{translating("requests.table.course")}</th>
                </tr>
              </thead>
              <tbody>
                {filterRequests.map((request) => (
                  <tr key={request.id} className="border whitespace-nowrap">
                    <td className="px-4 py-2 flex gap-2 align-baseline font-bold text-blue-700">
                      <input
                        type="checkbox"
                        className="mr2 align-text-bottom"
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
                    <td className="px-4 py-2">{request.className}</td>
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
        className={`appear float right bg-red-500 hover:bg-red-700 ${selectedRequestIds.length && "active"}`}
        onClick={() => {
          deleteMutation.mutate(selectedRequestIds)
          setSelectedRequestIds([])
        }}
      >< BsTrash /></button>

      <button
        className={`appear float left bg-yellow-500 hover:bg-yellow-700 ${selectedRequestIds.length && "active"}`}
        onClick={() => setShowModal(true)}>
        <BsPencil />
      </button>

      {showModal && (
        <ChangeClassRequestModal
          onClose={() => {
            setShowModal(false)
            setSelectedRequestIds([])
          }}
          classes={classesIdentity}
          getData={getAllRequests}
          requestIds={selectedRequestIds}
        />
      )}
    </div>
  )
}

export default WaitingRequests;