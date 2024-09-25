import useFetchOne from "./useFetchOne";

const useFetchQR = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  return useFetchOne<{ img: string }>(`/api/showQR/${id}`, true);
};

export default useFetchQR;
