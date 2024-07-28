export type ToastMessageType = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContextType = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessageType) => void;
};

export type loginData = {
  password: string;
  phone: string;
};

export type imageType = {
  id: number;
  image: string;
};

export type classType = {
  id: number;
  name: string;
  studentsNumber: number;
};

export type courseType = {
  id: number;
  arName: string;
  heName: string;
  arDescription: string;
  heDescription: string;
  image: string;
};

export type waitingRequests = {
  id: number;
  fullName: string;
  phone: string;
  notes: string;
  courses: {
    ar: string;
    he: string;
  }[];
};

export type requestsType = {
  id: number;
  fullName: string;
  phone: string;
  notes: string;
  classId: number;
  className: string;
  courses: {
    ar: string;
    he: string;
  }[];
};
