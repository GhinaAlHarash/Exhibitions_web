import useSendData from "./useSendData";
import { User } from "./useLogin";
const useSendEmail = () => {
  const res = useSendData<User, { email: string }>("/api/UserForgotPassword");

  if (res.data?.status == 200) {
    localStorage.setItem("userId", res.data?.data.id.toString());
    localStorage.setItem("userEmail", res.data.data.email);
  }
  return res;
};
export default useSendEmail;
