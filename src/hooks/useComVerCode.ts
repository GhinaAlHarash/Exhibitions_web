import useSendData from "./useSendData";
import { User } from "./useLogin";

const useComVerCode = () => {
  let id = Number(localStorage.getItem("userId"));
  const res = useSendData<User, { code: string }>(
    `/api/code_check_verification/${id}`
  );
  if (res.data?.data) {
    localStorage.removeItem("userToken");
    localStorage.setItem("userToken", res.data?.data.token);
  }
  return res;
};

export default useComVerCode;
