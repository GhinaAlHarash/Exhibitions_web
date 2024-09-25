import React from "react";
import useSendData from "./useSendData";
interface Sched {
  topic_name: string;
  speaker_name: string;
  summary: string;
  body: string;
  time: string;
  date: string;
  about_speaker: string;
  img: File | undefined;
  speaker_email: string;
  linkedin: string | undefined;
  facebook: string | undefined;
}
const useAddSchedule = () => {
  let id = Number(localStorage.getItem("CurrentExhId"));
  const res = useSendData<Sched, Sched>(`/api/exhibitions/addSchedule/${id}`);
  return res;
};

export default useAddSchedule;
