import useSendData from "./useSendData";

const useSendVerCode = () => {
    let id=Number(localStorage.getItem("userId"));
  const res = useSendData<[], {code:string}>(`/api/UserCodeCheck/${id}`);
  return res;
};
export default useSendVerCode;
