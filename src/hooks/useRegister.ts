import apiClient from "../services/apiClient";
import useSendData from "./useSendData";
import { User } from "./useLogin";

export interface registerData {
  name: string;
  email: string;
  password: String;
  password_confirmation: string;
  phone: string;
}

const useRegister = () => {
  const res = useSendData<User, registerData>("/api/organizer_register");
  apiClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data?.data.token}`;

  if (res.data?.status == 200 && res.data.data) {
    localStorage.setItem("userId", res.data?.data.id.toString());
    localStorage.setItem("userToken", res.data?.data.token);
    localStorage.setItem("useroles", res.data?.data.roles[0]);
    localStorage.setItem("username", res.data?.data.name);
  }

  return res;
};

export default useRegister;
