import useFetchOne from "./useFetchOne";

export interface profileCom {
  id: number;
  name: string;
  email: string;
  phone: string;
  userable: {
    id: number;
    company_name: string;
    business_email: string;
    website: string;
    office_address: string;
    summary: string;
    commercial_register: string;
    body: string;
    status:string;
    number_of_employees: null;
    img: string;
  };
}
const useComProfile = () => {
  if (!localStorage.getItem("CurrentProfile"))
    return useFetchOne<profileCom>(`/api/showProfile`, true);
  else {
    let id = Number(localStorage.getItem("CurrentProfile"));
    return useFetchOne<profileCom>(`/api/company/${id}`, true);
  }
};

export default useComProfile;
