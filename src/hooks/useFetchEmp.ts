import useFetchData from "./useFetchData";
export interface Emp {
    id: number;
    name: string;
    email: string;
    phone: string;
    userable:{is_available:number}
}
const useFetchEmp = () => {
  return useFetchData<Emp>(`/api/showEmployee`,true);
};
export default useFetchEmp;
