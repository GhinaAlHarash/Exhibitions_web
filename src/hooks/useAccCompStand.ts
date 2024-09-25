import useFetchData from "./useFetchData";

const useAccCompStand = (
  enable: boolean,
  idC: number,
  idS: string,
  fun: () => void
) => {
  return useFetchData<"">(
    `/api/acceptCompanyRequest/${idC}/${idS}`,
    enable,
    fun
  );
};

export default useAccCompStand;
