import useFetchData from "./useFetchData";

const useAppSections = () => {
    return useFetchData<{id:number, name:string}>(`/api/sections`,true);
  };
  export default useAppSections