import useFetchData from './useFetchData';

const useRejCompJion = (enable:boolean, id:number,fun: () => void) => {
    return useFetchData<"">(`/api/reject_company/${id}`,enable, fun);
}

export default useRejCompJion