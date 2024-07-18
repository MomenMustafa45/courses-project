import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../hooks/dispatchHooks";
import { toggleModal } from "../store/slices/modalSlice";
import arabicLang from "../../public/translation/arabic/modal.json";
import hebrawLang from "../../public/translation/hebraw/modal.json";
import { useLanguage } from "../hooks/useLang";
import { useForm, SubmitHandler } from "react-hook-form";
import MultiSelect from "./MultiSelect";

interface IFormInput {
  name: string;
  phoneNumber: number;
  email: string;
  notes: string;
}

const ModalForm = () => {
  const showModal = useAppSelector((state) => state.showModal.value);
  const lang = useLanguage(arabicLang, hebrawLang);
  const dispatch = useAppDispatch();

  // form
  const { register, handleSubmit, formState } = useForm<IFormInput>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log("hello");

    if (errors) {
      console.log(errors);
    }
  };

  return (
    <div
      className={` fixed w-full h-full bg-[#0000007a] top-0 left-0 z-50 ${
        showModal ? "block" : "hidden"
      } flex justify-center items-center`}
    >
      <div className="relative flex w-full max-w-[24rem]  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md bounceIn">
        <span
          className=" absolute top-2 right-2 cursor-pointer"
          onClick={() => dispatch(toggleModal())}
        >
          <IoClose size={30} />
        </span>
        <div className="p-6">
          <div className="block overflow-visible">
            <div className="relative block w-full overflow-visible bg-transparent">
              <div
                role="tabpanel"
                className="w-full p-0 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                data-value="card"
              >
                <form
                  className="flex flex-col gap-4 mt-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* checkboxes */}
                  <MultiSelect />
                  {/* checkboxes */}

                  {/* input name */}

                  <div>
                    <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {lang.username}
                    </p>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <input
                        {...register("name", {
                          required: "Name is required",
                          maxLength: 20,
                        })}
                        placeholder={lang.usernamePlaceholder}
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-default focus:border-t-transparent focus:!border-t-pink-default focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-default peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-default peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                  </div>
                  {/* input name */}
                  {/* input number */}
                  <div className="my-1">
                    <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {lang.phoneNumber}
                    </p>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <input
                        type="number"
                        {...register("phoneNumber", {
                          required: "phone number is required",
                          pattern: {
                            value: /^05\d{0,8}$/,
                            message: "Phone number must start with 05",
                          },
                        })}
                        placeholder={lang.phoneNumberHolder}
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-default focus:border-t-transparent focus:!border-t-pink-default focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                  </div>
                  {/* input email */}
                  <div className="my-1">
                    <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {lang.email}
                    </p>
                    <div className="relative h-10 w-full min-w-[200px]">
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        placeholder={lang.emailHolder}
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-default focus:border-t-transparent focus:!border-t-pink-default focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                  </div>

                  {/* input notes */}
                  <div className="my-1">
                    <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                      {lang.notes}
                    </p>
                    <div className="relative w-full min-w-[200px]">
                      <textarea
                        {...register("notes")}
                        placeholder={lang.notesHolder}
                        rows={3}
                        className="peer w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-default focus:border-t-transparent focus:!border-t-pink-default focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 resize-none overflow-y-auto"
                      />
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                    </div>
                  </div>

                  {/* submit btn */}
                  <button className="select-none rounded-lg bg-pink-default py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    {lang.joinNow}
                  </button>
                  {/* submit btn */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
