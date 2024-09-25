import useFetchData from "./useFetchData";

const useFetchProducts = () => {
  let id = localStorage.getItem("CurrentProfile")
    ? localStorage.getItem("CurrentProfile")
    : Number(localStorage.getItem("userId"));
  return useFetchData<{ id: number; info: string; img: string }>(
    `/api/showProducts/${id}`,
    true
  );
};

export default useFetchProducts;
